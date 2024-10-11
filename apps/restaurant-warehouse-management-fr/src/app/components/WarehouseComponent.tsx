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
  Loader,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconPlus, IconPencil, IconEraser } from '@tabler/icons-react';
import axios from "axios"
import { notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import classes from './WarehouseComponent.module.css';


/* eslint-disable-next-line */
export interface WarehouseComponentProps {}

interface Warehouse {
  id: number;
  name: string;
}
interface RowData {
  item_id: string;
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
  const string_warehouse = localStorage.getItem('warehouse')
  console.log("string_warehouse", string_warehouse)
  let found_warehouse : Warehouse = {
    id: 0,
    name: ''
  }
  if (string_warehouse) {
    found_warehouse = JSON.parse(string_warehouse)
  }
  // console.log("getItem", user)
  // user.full_name = user.first_name + ' ' + user.last_name;
  // user.image = 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png';
  const [warehouse, setWarehouse] = useState<Warehouse>(found_warehouse);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [data, setData] = useState<RowData[]>([{item_id: "",item_name: "", amount: 0, unit: "", price_per_unit: 0, total_price:0, type: ""}]); // all items in specific warehouse
  // const [foundData, setFoundData] = useState<RowData>({item_id: "",item_name: "", amount: 0, unit: "", price_per_unit: 0, total_price:0, type: ""}); // found item in delete item modal 
  const [allDataNames, setAllDataNames] = useState<{id: "", name: ""}[]>([{id: "", name: ""}]); // all items names in system
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingItem, setLoadingItem] = useState<boolean>(false) // loading specific item after searching
  const [itemLoaded, setItemLoaded] = useState<boolean>(false)
  const [sortedData, setSortedData] = useState<RowData[]>(data);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // add / edit item
  const [modalType, setModalType] = useState<string>('add'); // add or edit food information
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false); // confirm delete item from warehouse
  const [itemId, setItemId] = useState<string>(''); // for search item based on name
  const [itemName, setItemName] = useState<string[]>(['']); // for search item based on name
  const [itemAmount, setItemAmount] = useState<number>(0); 
  const [foundItem, setFoundItem] = useState<RowAllData>({id: "", name: "", unit: "", price_per_unit: 0, type: ""}); // found item in add item modal 
  
 
  const getData = async () => { // get items that are in specific warehouse
    setLoading(true);
    console.log("warehouse in getData: ", warehouse)
    await axios.get(`http://localhost:3333/exist/warehouse/${warehouse.id}`)
        .then(res => {
        
          setData(res.data);
          setSortedData(res.data);
          setLoading(false);
        })
        
        .catch(error => { 
          notifications.show({
                withBorder: true,
                title: 'Failed to recieve response from the server in warehouse page!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
          })
  }

  const getAllDataNames = async () => { // get all items names that are in defined in the system 
    setLoading(true);
    await axios.get('http://localhost:3333/warehouseItems/names')
        .then(res => {
        
          setAllDataNames(res.data); 
          setLoading(false);
        })
        
        .catch(error => {
            notifications.show({
                withBorder: true,
                title: 'Failed to get items names from the server in warehouse page!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
          })
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
    getAllDataNames();
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemLoaded(false);
    setItemName(['']);
    setItemAmount(0);
    setItemLoaded(false);
    setModalType("add");
  }
const handleOpenModal2 = () => {
    // setFoodId(food_id);
    // setFoodName(food_name);
    setIsModalOpen2(true);
   
  }
  const handleCloseModal2 = () => {
    console.log("We are in handleCloseModal2")
    setIsModalOpen2(false); 
    setItemId('');
    setItemName(['']);
  }
  const editItem = (item: RowAllData, item_amount: number) => {
    console.log("We are in editItem")
    setItemId(item.id)
    setFoundItem(item)
    setItemAmount(item_amount)
    setItemLoaded(true)
    setModalType("edit");
    handleOpenModal();
  }
  const deleteItem = (item_id: string, item_name: string) => {
    console.log("We are in deleteItem")
    // setFoundData(found_data)
    setItemId(item_id)
    setItemName([item_name])
    handleOpenModal2()
  }
const handleAddItem = async () => {
    const newExist = {
        warehouse_id: warehouse.id,
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
  const handleEditItem = async () => {
    const newExist = {
        warehouse_id: warehouse.id,
        item_id: foundItem.id,
        amount: itemAmount,
        unit: foundItem.unit,
      };
      setLoading(true);
      await axios.put(`http://localhost:3333/exist/${warehouse.id}/${itemId}`, newExist)
          .then(res => {  
            setLoading(false);
           
            notifications.show({
              withBorder: true,
              title: 'Item edited successfully!',
              message: '', 
              color: 'green',
              position: 'bottom-left',
              style: {borderColor: 'green', width: '30rem' },
            });
            getData();
          
          })
          
            .catch(error => {

              setLoading(false);
              notifications.show({
                withBorder: true,
                title: 'Failed to edit item!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
            })
    
    handleCloseModal();
    setFoundItem({id: "", name: "", unit: "", price_per_unit: 0, type: ""}); // Reset form after editing
  
  };

  const handleDeleteItem = () => {
    setLoading(true);
    axios.delete(`http://localhost:3333/exist/${warehouse.id}/${itemId}`)
      .then(res =>{
        console.log("delete item: ", res.data)
        setLoading(false);
        notifications.show({
          withBorder: true,
          title: 'Item deleted successfully!',
          message: '', 
          color: 'green',
          position: 'bottom-left',
          style: {borderColor: 'green', width: '30rem' },
        });
        getData();
      })
      .catch(error => {
        setLoading(false);
        notifications.show({
          withBorder: true,
          title: 'Failed to delete item!',
          message: JSON.stringify(error.response?.data), 
          color: 'red',
          position: 'bottom-left',
          style: {borderColor: 'red', width: '30rem' },
        });
      })
    setLoading(false)
    handleCloseModal2();
  }
  
  
  const loadItem = async () => { // get item's information
    setLoadingItem(true)
    const item = await allDataNames.filter((item) => {return item.name === itemName[1]})

    const itemId = item[0].id;
    await axios.get(`http://localhost:3333/warehouseItems/${itemId}`)
      .then(res => {
        setFoundItem(res.data[0]);
        setLoadingItem(false)
        setItemLoaded(true)
      })
      .catch(error => {
        console.log("axios error in loadItem function in warehouse page :(((")})

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

  const rows = sortedData.map((row) => {
    return (
    <Table.Tr key={row.item_id}>
      <Table.Td>{row.item_name}</Table.Td>
      <Table.Td>{row.amount}</Table.Td>
      <Table.Td>{row.unit}</Table.Td>
      <Table.Td>{row.price_per_unit}</Table.Td>
      <Table.Td>{row.total_price}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <Group>
        <Tooltip label="Edit Item" position="top">
          <ActionIcon variant="outline" color='gray' size='sm' onClick={() => editItem({id: row.item_id, name: row.item_name, unit: row.unit, price_per_unit: row.price_per_unit, type: row.type}, row.amount)}>
            <IconPencil size={12} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Item" position="top" onClick={() => deleteItem(row.item_id, row.item_name)}>
          <ActionIcon variant="outline" color='gray' size='sm'>
            <IconEraser size={12} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
      </Table.Td>
    </Table.Tr>
  )
})
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
            
              <Loader type="dots" color="grape" /> 
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
          <Modal 
            opened={isModalOpen2}
            onClose={handleCloseModal2}
            title="Confirm delete item from warehouse"
          >
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <>
                <Text>Are you sure to delete "{itemName[0]}" from warehouse "{warehouse.name}" ?</Text>
                <Space h="md" />
                <Group justify="center" grow>
                  <Button variant="outline" color="gray" onClick={handleCloseModal2}>
                    Cancel
                  </Button>
                
                  <Button variant="filled" color='red' onClick={handleDeleteItem}>
                  Delete
                  </Button>   
                </Group>
              </>
              
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
      { modalType === 'add' ?
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
      </Modal> :

      <Modal opened={isModalOpen} onClose={handleCloseModal} title="Edit an item in warehouse">
        <Box style={{ display: 'flex', flexDirection: 'column' }}> 
          <ItemDetails item={foundItem} itemLoaded={itemLoaded} itemAmount={itemAmount} setItemAmount={setItemAmount}/>
          <Space h="md"/>
          <Group justify='center'grow>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="filled" onClick={handleEditItem}>
              Add
            </Button>
          </Group>
        </Box>
      </Modal>
        }
      <Modal 
            opened={isModalOpen2}
            onClose={handleCloseModal2}
            title="Confirm delete item from warehouse"
          >
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <>
                <Text>Are you sure to delete "{itemName[0]}" from warehouse "{warehouse.name}" ?</Text>
                <Space h="md" />
                <Group justify="center" grow>
                  <Button variant="outline" color="gray" onClick={handleCloseModal2}>
                    Cancel
                  </Button>
                
                  <Button variant="filled" color='red' onClick={handleDeleteItem}>
                  Delete
                  </Button>   
                </Group>
              </>
              
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
