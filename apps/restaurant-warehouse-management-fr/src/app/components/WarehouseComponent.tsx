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
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './WarehouseComponent.module.css';

/* eslint-disable-next-line */
export interface WarehouseComponentProps {}

interface RowData {
  name: string;
  unit: string;
  amount: string;
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

const data = [
  {
    name: 'Athena Weissnat',
    price: '10000',
    amount: '20000',
    unit: 'gram',
    type: 'food stuff'
  },
  {
    name: 'Deangelo Runolfsson',
    price: '1500',
    amount: '10000',
    unit: 'gram',
    type: 'food stuff'
  },
  {
    name: 'Danny Carter',
    price: '2000', 
    amount: '11000',
    unit: 'gram',
    type: 'food stuff'
  },
  {
    name: 'Trace Tremblay PhD',
    price: '27000', 
    amount: '130000',
    unit: 'gram',
    type: 'food stuff'
  },
  {
    name: 'Derek Dibbert',
    price: '30000', 
    amount: '250000',
    unit: 'gram',
    type: 'food stuff'
  },
  {
    name: 'Viola Bernhard',
    price: '29000', 
    amount: '250000',
    unit: 'piece',
    type: 'food stuff'
  },
  {
    name: 'Austin Jacobi',
    price: '31000', 
    amount: '250000',
    unit: 'piece',
    type: 'food stuff'
  },
  {
    name: 'Hershel Mosciski',
    price: '35000', 
    amount: '3000000',
    unit: 'piece',
    type: 'dish side'
  },
  {
    name: 'Mylene Ebert',
    price: '4000', 
    amount: '3000000',
    unit: 'piece',
    type: 'dish side'
  },
  {
    name: 'Lou Trantow',
    price: '42000', 
    amount: '3000000',
    unit: 'slice',
    type: 'dish side'
  },
  {
    name: 'Dariana Weimann',
    price: '45000', 
    amount: '3000000',
    unit: 'slice',
    type: 'dish side'
  },
  {
    name: 'Dr. Christy Herman',
    price: '12000', 
    amount: '3000000',
    unit: 'slice',
    type: 'dish side'
  },
  {
    name: 'Katelin Schuster',
    price: '18000',
    amount: '3000000',
    unit: 'slice',
    type: 'dish side'
  },
  {
    name: 'Melyna Macejkovic',
    price: '3500', 
    amount: '3500000',
    unit: 'piece',
    type: 'dish side'
  },
  {
    name: 'Pinkie Rice',
    price: '5000', 
    amount: '4000000',
    unit: 'gram',
    type: 'dish side'
  },
  {
    name: 'Brain Kreiger',
    price: '21000', 
    amount: '4000000',
    unit: 'gram',
    type: 'dish side'
  },
];

export function WarehouseComponent(props: WarehouseComponentProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

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
      <Table.Td>{row.amount}</Table.Td>
      <Table.Td>{row.unit}</Table.Td>
      <Table.Td>{row.price}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search an item"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
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

export default WarehouseComponent;
