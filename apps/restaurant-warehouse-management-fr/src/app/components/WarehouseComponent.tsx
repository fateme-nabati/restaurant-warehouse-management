import { useState, useEffect } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Box,
  Button,
  Modal,
  MultiSelect,
  Space,
  Loader
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconPlus } from '@tabler/icons-react';
import axios from "axios"
import { notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import classes from './WarehouseComponent.module.css';


/* eslint-disable-next-line */
export interface WarehouseComponentProps {}

interface RowData {
  item_name: string;
  unit: string;
  amount: number;
  price_per_unit: number;
  total_price: number;
  type: string;
}
interface RowAllData {
  id: string;
  name: string;
  unit: string;
  price_per_unit: number;
  type: string;
}
interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

interface LoadItemProps {
  item: RowAllData;
  itemLoaded: boolean;
  itemAmount: number;
  setItemAmount(amount: number): void;
}


function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}
function ItemDetails({item, itemLoaded, itemAmount, setItemAmount} : LoadItemProps) {
  // const [amount, setAmount] = useState<number>(0);
  console.log("We are in LoadItem component", item);
  
  if (itemLoaded)
  {
    if (!item) {
      return <Text>No item information available.</Text>; 
    }
    return (

      <Group style={{ marginTop: '10px' }}>
      <Text><strong>Item name: </strong>{item.name}</Text>
      <br />
      <Text><strong>Price per Unit: </strong> {item.price_per_unit} T</Text>
      <br />
      {/* <TextInput label='Amount' placeholder='Please enter amount of item' type='number' value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}></TextInput> */}
      <TextInput label='Amount' placeholder='Please enter amount of item' type='number' value={itemAmount} onChange={(e) => setItemAmount(parseInt(e.target.value))}></TextInput>
      <br />
      <Text><strong>Unit: </strong>{item.unit}</Text>
      <br />
      <Text><strong>Type: </strong> {item.type}</Text>
    </Group>
      
    );

  }
}
// function AddWarehouseItemModal (props: AddWarehouseItemModalProps) {
// }
function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.keys(item).some((key) => {
      return typeof key === 'string' && key.toLowerCase().includes(query)})
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
  
        // Handle sorting for string properties
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return payload.reversed
            ? bValue.localeCompare(aValue)
            : aValue.localeCompare(bValue);
        }
  
        // Handle sorting for number properties
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return payload.reversed ? bValue - aValue : aValue - bValue;
        }
        return 0;
    }),
    payload.search
  );
}


export function WarehouseComponent(props: WarehouseComponentProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [data, setData] = useState<RowData[]>([{item_name: "", amount: 0, unit: "", price_per_unit: 0, total_price:0, type: ""}]);
  const [allDataNames, setAllDataNames] = useState<{id: "", name: ""}[]>([{id: "", name: ""}]);
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingItem, setLoadingItem] = useState<boolean>(false) // loading specific item after searching
  const [itemLoaded, setItemLoaded] = useState<boolean>(false)
  const [sortedData, setSortedData] = useState<RowData[]>(data);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string[]>(['']); // for search item based on name
  const [itemAmount, setItemAmount] = useState<number>(0); 
  const [foundItem, setFoundItem] = useState<RowAllData>({id: "", name: "", unit: "", price_per_unit: 0, type: ""});
  
 
  const getData = async () => { // get items that are in specific warehouse
    setLoading(true);
    await axios.get('http://localhost:3333/exist/warehouse/1')
        .then(res => {
        
          setData(res.data);
          setSortedData(res.data);
          setLoading(false);
        })
        
        .catch(error => {console.log("axios error in getData function in warehouse page :(((")})
  }

  const getAllDataNames = async () => { // get all items names that are in defined in the system 
    setLoading(true);
    await axios.get('http://localhost:3333/warehouseItems/names')
        .then(res => {
        
          setAllDataNames(res.data);
          console.log("allDataNames", allDataNames)
          console.log("res.data", res.data)
          setLoading(false);
        })
        
        .catch(error => {console.log("axios error in getAllDataNames function in warehouse page :(((")})
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
    getAllDataNames();
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemLoaded(false)
    setItemName(['']);
    setItemAmount(0);
  }

  const handleAddItem = async () => {
    const newExist = {
        warehouse_id: 1,
        item_id: foundItem.id,
        amount: itemAmount,
        unit: foundItem.unit,
      };
      setLoading(true);
      await axios.post('http://localhost:3333/exist', newExist)
          .then(res => {  
            setLoading(false);
           
            notifications.show({
              withBorder: true,
              title: 'Item added into warehouse successfully!',
              message: '', 
              color: 'green',
              position: 'bottom-left',
              style: {borderColor: 'green', width: '30rem' },
            });
            getData();
            console.log("after add exist")
            console.log('new exist:', newExist)
          
          })
          
            .catch(error => {

              setLoading(false);
              notifications.show({
                withBorder: true,
                title: 'Failed to add item into warehouse!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
            })
    
    handleCloseModal();
    setFoundItem({id: "", name: "", unit: "", price_per_unit: 0, type: ""}); // Reset form after adding
  
  };

  const loadItem = async () => { // get item's information
    console.log("befor load item")
    setLoadingItem(true)
    const item = await allDataNames.filter((item) => {return item.name === itemName[1]})

    console.log("item: ", item)
    const itemId = item[0].id;
    console.log("itemId: ", itemId)
    await axios.get(`http://localhost:3333/warehouseItems/${itemId}`)
      .then(res => {
        setFoundItem(res.data[0]);
        setLoadingItem(false)
        setItemLoaded(true)
        console.log("res.data in loadItem", res.data)
        console.log("found item in loadItem", foundItem)
      })
      .catch(error => {console.log("axios error in loadItem function in warehouse page :(((")})

  }
  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.item_name}>
      <Table.Td>{row.item_name}</Table.Td>
      <Table.Td>{row.amount}</Table.Td>
      <Table.Td>{row.unit}</Table.Td>
      <Table.Td>{row.price_per_unit}</Table.Td>
      <Table.Td>{row.total_price}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {getData()}, []);
  if(loading){
    console.log("loading")
    return <Loader type="dots" color="grape" />;
  }
  if(loadingItem) {
    return(
      <ScrollArea>
        <Box style={{ display: 'flex', width: '100%' }}>
          <TextInput
            placeholder="Search an item"
            mb="md"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
            style={{ width: '85%' }}
          />      
          <Button variant="filled" color="green" size="md-compact" ml={50}  leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} stroke={2} />} onClick={handleOpenModal} >Add</Button>
          <Modal opened={isModalOpen} onClose={handleCloseModal} title="Add an item to warehouse">
            <Box style={{ display: 'flex', flexDirection: 'column' }}> 
            
              <MultiSelect
              label=" Please choose just one item and then click on search button"
              placeholder="Search an item"
              limit={5}
              data={allDataNames.map((item) => item.name)}
              maxValues={2}  
              value={itemName}
              nothingFoundMessage="Nothing found..."
              onChange={(values) => setItemName(values)}
              searchable
            /> 
            <Space h="md"/>
                                                                                                  <Group justify='center' grow>
              <Button variant="filled" size="md-compact"  leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={2} />} onClick={loadItem} >Search</Button> 
            </Group>

            <Space h="md"/>
            <Text ta="center" c="dimmed">__________________________________________</Text>
            <Text>item information:</Text>
            <Space h="md"/>
            {/* {loadingItem ? 
              <Loader type="dots" color="grape" /> :
              <ItemDetails item={foundItem} itemLoaded={itemLoaded} />
            } */}

              <Loader type="dots" color="grape" /> :
              <Space h="md"/>
              <Group justify='center'grow>
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="filled" onClick={handleAddItem}>
                  Add
                </Button>
              </Group>

            </Box>
          </Modal>
        
          </Box>

          <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
            <Table.Tbody>
              <Table.Tr>
                <Th
                  sorted={sortBy === 'item_name'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('item_name')}
                >
                  Name
                </Th> 
                <Th
                  sorted={sortBy === 'amount'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('amount')}
                >
                  amount
                </Th>
                <Th
                  sorted={sortBy === 'unit'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('unit')}
                >
                  unit
                </Th>
                <Th
                  sorted={sortBy === 'price_per_unit'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('price_per_unit')}
                >
                  price per unit
                </Th>
                <Th
                  sorted={sortBy === 'total_price'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('total_price')}
                >
                  total price 
                </Th> 
                <Th
                  sorted={sortBy === 'type'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('type')}
                >
                  type
                </Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={Object.keys(data[0]).length}>
                    <Text fw={500} ta="center">
                      Nothing found
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
    );
  }
  return (
    <ScrollArea>
      <Box style={{ display: 'flex', width: '100%' }}>
      <TextInput
        placeholder="Search an item"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
        style={{ width: '85%' }}
      />      
      <Button variant="filled" color="green" size="md-compact" ml={50}  leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} stroke={2} />} onClick={handleOpenModal} >Add</Button>
      <Modal opened={isModalOpen} onClose={handleCloseModal} title="Add an item to warehouse">
        <Box style={{ display: 'flex', flexDirection: 'column' }}> 
         
          <MultiSelect
          label=" Please choose just one item and then click on search button"
          placeholder="Search an item"
          limit={5}
          data={allDataNames.map((item) => item.name)}
          maxValues={2}  
          value={itemName}
          nothingFoundMessage="Nothing found..."
          onChange={(values) => setItemName(values)}
          searchable
         /> 
        <Space h="md"/>
                                                                                               <Group justify='center' grow>
          <Button variant="filled" size="md-compact"  leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={2} />} onClick={loadItem} >Search</Button> 
        </Group>

        <Space h="md"/>
        <Text ta="center" c="dimmed" >__________________________________________</Text>
        <Text>item information:</Text>
        <Space h="md"/>
        {/* {loadingItem ? 
          <Loader type="dots" color="grape" /> :
          <ItemDetails item={foundItem} itemLoaded={itemLoaded} />
        } */}

          <ItemDetails item={foundItem} itemLoaded={itemLoaded} itemAmount={itemAmount} setItemAmount={setItemAmount}/>
          <Space h="md"/>
          <Group justify='center'grow>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="filled" onClick={handleAddItem}>
              Add
            </Button>
          </Group>

        </Box>
      </Modal>
     
      </Box>

      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'item_name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('item_name')}
            >
              Name
            </Th> 
            <Th
              sorted={sortBy === 'amount'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('amount')}
            >
              amount
            </Th>
            <Th
              sorted={sortBy === 'unit'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('unit')}
            >
              unit
            </Th>
            <Th
              sorted={sortBy === 'price_per_unit'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('price_per_unit')}
            >
              price per unit
            </Th>
            <Th
              sorted={sortBy === 'total_price'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('total_price')}
            >
              total price 
            </Th> 
            <Th
              sorted={sortBy === 'type'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('type')}
            >
              type
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
 
}

export default WarehouseComponent;
