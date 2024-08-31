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
import classes from './WarehouseComponent.module.css';
// import {data as allData} from './ItemsComponent' ;

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
  name: string;
  unit: string;
  price: number;
  type: string;
}
interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

interface LoadItemProps {
  name: string;
  changed: boolean;
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
// function LoadItem({name, changed} : LoadItemProps) {
//   // alert("We are in LoadItem function");
//   if (changed)
//   {
//     // alert("We are in LoadItem function");
//     const item = allData.filter((item) => item.name === name);
//     // setItemName(name);
//     return (
//       <Text>
//         `name : ${item[0].name}`
//         `type : ${item[0].type}`
//       </Text>
//     );

//   }
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
// export const allData = [ // in kole itme hast ke bayad ba get warehouseItems be dast biad
//   {
//     name: 'Athena Weissnat',
//     price: '10000',
//     unit: 'Elouis',
//     type: 'food stuff'
//   },
//   {
//     name: 'Deangelo Runolfsson',
//     price: '1500',
//     unit: 'Kadin_Trantow87@yahoo.com',
//     type: 'food stuff'
//   }
// ]


export function WarehouseComponent(props: WarehouseComponentProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [data, setData] = useState<RowData[]>([{item_name: "", amount: 0, unit: "", price_per_unit: 0, total_price:0, type: ""}]);
  const [allData, setAllData] = useState<RowAllData[]>([{name: "", unit: "", price: 0, type: ""}]);
  const [loading, setLoading] = useState<boolean>(true)
  const [sortedData, setSortedData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  // const [foodName, setFoodName] = useState('');
  // const [price, setPrice] = useState(0);
  const getData = async () => { // get items that are in specific warehouse
    console.log("befor load data")
    setLoading(true);
    await axios.get('http://localhost:3333/exist/warehouse/1')
        .then(res => {
        
          setData(res.data);
          setSortedData(res.data);
          console.log("after load data")
          setLoading(false);
        })
        
        .catch(error => {console.log("axios error in warehouse page :(((")})
  }

  const getAllData = async () => { // get all items that are in defined in the system 
    console.log("befor load all data")
    setLoading(true);
    await axios.get('http://localhost:3333/warehouseItems')
        .then(res => {
        
          setAllData(res.data);
          console.log("after load all data")
          setLoading(false);
        })
        
        .catch(error => {console.log("axios error in warehouse page :(((")})
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
    getAllData();
  }
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddItem = () => {
    console.log("item found:", itemName)
    handleCloseModal();
    setItemName('');
    // setFoodName(''); 
    // setPrice(0);
  // alert("We are in handleAddItem function");
  };
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
  else {
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

          {/* <TextInput
          placeholder="Search an item"
          mb="md"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
          style={{ width: '85%' }}
        />       */}
          <MultiSelect
          label="Item name"
          placeholder="Search an item"
          limit={5}
          data={allData.map((item) => item.name)}
          maxValues={1}  
          searchable
          searchValue={itemName}
          nothingFoundMessage="Nothing found..."
          onChange={() => setItemName} 
         /> 

          {/* <LoadItem name={itemName} changed={itemName !== ''} /> */}

          {/* <TextInput label="Food Name" placeholder="Enter food name" value={foodName} onChange={(e) => setFoodName(e.target.value)} /> */}
           
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
}

export default WarehouseComponent;
