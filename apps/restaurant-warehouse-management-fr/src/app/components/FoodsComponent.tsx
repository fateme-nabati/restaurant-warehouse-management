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
  Space,
  MultiSelect,
} from '@mantine/core';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconPlus,
} from '@tabler/icons-react';
import classes from './FoodsComponent.module.css';
import { data as allData } from './ItemsComponent';

/* eslint-disable-next-line */
export interface FoodsComponentProps {}

interface RowData {
  name: string;
  price: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
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
    name: 'Ghorme sabzi',
    price: '10000',
  },
  {
    name: 'Gheyme',
    price: '1500',
  },
  {
    name: 'Chicken',
    price: '2000',
  },
  {
    name: 'Fish',
    price: '27000',
  },
  {
    name: 'Falafel',
    price: '30000',
  },
  {
    name: 'Viola Bernhard',
    price: '29000',
  },
  {
    name: 'Austin Jacobi',
    price: '31000',
  },
  {
    name: 'Hershel Mosciski',
    price: '35000',
  },
  {
    name: 'Mylene Ebert',
    price: '4000',
  },
  {
    name: 'Lou Trantow',
    price: '42000',
  },
  {
    name: 'Dariana Weimann',
    price: '45000',
  },
  {
    name: 'Dr. Christy Herman',
    price: '12000',
  },
  {
    name: 'Katelin Schuster',
    price: '18000',
  },
  {
    name: 'Melyna Macejkovic',
    price: '3500',
  },
  {
    name: 'Pinkie Rice',
    price: '5000',
  },
  {
    name: 'Brain Kreiger',
    price: '21000',
  },
];

export function FoodsComponent(props: FoodsComponentProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState(0);
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState(0);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenModal2 = () => setIsModalOpen2(true);
  const handleCloseModal2 = () => setIsModalOpen2(false);

  const handleAddFood = () => {
    handleCloseModal();
    setFoodName('');
    setPrice(0);
    // setItemName('');
  };
  const handleAddIngidient = () => {
    handleCloseModal2();
    setItemName('');
    setItemAmount(0);
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
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.price}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Box style={{ display: 'flex', width: '100%' }}>
        <TextInput
          placeholder="Search a food"
          mb="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
          style={{ width: '85%' }}
        />

        <Button
          variant="filled"
          color="green"
          size="md-compact"
          ml={50}
          leftSection={
            <IconPlus style={{ width: rem(16), height: rem(16) }} stroke={2} />
          }
          onClick={handleOpenModal}
        >
          Add
        </Button>

        <Modal
          opened={isModalOpen}
          onClose={handleCloseModal}
          title="Add a food"
        >
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <TextInput
              label="Food Name"
              placeholder="Enter food name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />

            <TextInput
              label="Price per plate"
              placeholder="Enter price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <Space h="md" />
            <Group justify="center" grow>
            <Button
              justify="center"
              variant="filled"
              color="green"
              size="md-compact"
              leftSection={
                <IconPlus
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={2}
                />
              }
              onClick={handleOpenModal2}
              style={{ marginTop: rem(25), height: rem(32) }}
            >
              Add ingridient
            </Button>
            </Group>
            <Modal
              opened={isModalOpen2}
              onClose={handleCloseModal2}
              title="Add an ingridient"
            >
              <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <MultiSelect
                  label="Item name"
                  placeholder="Search an item"
                  limit={5}
                  data={allData.map((item) => item.name)}
                  maxValues={1}
                  searchValue={itemName}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  onChange={() => setItemName}
                />

                <Space h="md" />
                <Group justify="center" grow>
                  <Button variant="outline" onClick={handleCloseModal2}>
                    Cancel
                  </Button>
                  <Button variant="filled" onClick={handleAddIngidient}>
                    Add
                  </Button>
                </Group>
              </Box>
            </Modal>
            <Space h="md" />
            {/* <Text ta='center'>________________________________________</Text> */}
            <Group justify="center" grow>
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="filled" onClick={handleAddFood}>
                Add
              </Button>
            </Group>
          </Box>
        </Modal>
      </Box>

      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
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
              sorted={sortBy === 'price'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('price')}
            >
              price
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

export default FoodsComponent;
