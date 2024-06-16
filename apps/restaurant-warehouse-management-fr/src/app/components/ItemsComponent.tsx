import { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Button,
  Modal,
  Box,
  Select,
  Space,
  
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconPlus } from '@tabler/icons-react';
import classes from './ItemsComponent.module.css';

/* eslint-disable-next-line */
export interface ItemsComponentProps {}

interface RowData {
  name: string;
  unit: string;
  price: string;
  type: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
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

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
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
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export const data = [
  {
    name: 'Athena Weissnat',
    price: '10000',
    unit: 'Elouis',
    type: 'food stuff'
  },
  {
    name: 'Deangelo Runolfsson',
    price: '1500',
    unit: 'Kadin_Trantow87@yahoo.com',
    type: 'food stuff'
  },
  {
    name: 'Danny Carter',
    price: '2000', 
    unit: 'Marina3@hotmail.com',
    type: 'food stuff'
  },
  {
    name: 'Trace Tremblay PhD',
    price: '27000', 
    unit: 'Antonina.Pouros@yahoo.com',
    type: 'food stuff'
  },
  {
    name: 'Derek Dibbert',
    price: '30000', 
    unit: 'Abagail29@hotmail.com',
    type: 'food stuff'
  },
  {
    name: 'Viola Bernhard',
    price: '29000', 
    unit: 'Jamie23@hotmail.com',
    type: 'food stuff'
  },
  {
    name: 'Austin Jacobi',
    price: '31000', 
    unit: 'Genesis42@yahoo.com',
    type: 'food stuff'
  },
  {
    name: 'Hershel Mosciski',
    price: '35000', 
    unit: 'Idella.Stehr28@yahoo.com',
    type: 'dish side'
  },
  {
    name: 'Mylene Ebert',
    price: '4000', 
    unit: 'Hildegard17@hotmail.com',
    type: 'dish side'
  },
  {
    name: 'Lou Trantow',
    price: '42000', 
    unit: 'Hillard.Barrows1@hotmail.com',
    type: 'dish side'
  },
  {
    name: 'Dariana Weimann',
    price: '45000', 
    unit: 'Colleen80@gmail.com',
    type: 'dish side'
  },
  {
    name: 'Dr. Christy Herman',
    price: '12000', 
    unit: 'Lilyan98@gmail.com',
    type: 'dish side'
  },
  {
    name: 'Katelin Schuster',
    price: '18000',
    unit: 'Erich_Brekke76@gmail.com',
    type: 'dish side'
  },
  {
    name: 'Melyna Macejkovic',
    price: '3500', 
    unit: 'Kylee4@yahoo.com',
    type: 'dish side'
  },
  {
    name: 'Pinkie Rice',
    price: '5000', 
    unit: 'Fiona.Kutch@hotmail.com',
    type: 'dish side'
  },
  {
    name: 'Brain Kreiger',
    price: '21000', 
    unit: 'Rico98@hotmail.com',
    type: 'dish side'
  },
];

export function ItemsComponent(props: ItemsComponentProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  // const [opened, { open, close }] = useDisclosure(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [unit, setUnit] = useState <string | null>(''); // Add unit selection
  const [price, setPrice] = useState(0);
  const [type, setType] = useState <string | null>(''); // Add type selection

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddItem = () => {
    // Implement logic to add item to warehouse with itemName, quantity, and category
    handleCloseModal();
    setItemName(''); // Reset form after adding
    setUnit('');
    setPrice(0);
    setType('');
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
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.unit}</Table.Td>
      <Table.Td>{row.price}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      {/* <Group justify='space-between' mt="md" grow> */}
     
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

      <Modal opened={isModalOpen} onClose={handleCloseModal} title="Add an item">
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <TextInput label="Item Name" placeholder="Enter item name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
 

          <Select label="Unit" placeholder="Select unit" data={['Gram', 'Kilogram','Peice', 'Slice', 'Pakage', 'Bottle']} value={unit} onChange={(_value, option) => setUnit(_value)}
          />          
          <TextInput label="Price per unit" placeholder="Enter price" type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />

          <Select label="Type" placeholder="Select item type" data={['Food stuff', 'Dish side']} value={type} onChange={(_value, option) => setType(_value)}
          />          
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
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'unit'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('unit')}
            >
              unit
            </Th>
            <Th
              sorted={sortBy === 'price'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('price')}
            >
              price
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

export default ItemsComponent;
