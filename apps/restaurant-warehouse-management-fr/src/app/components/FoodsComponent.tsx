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
  Button,
  Modal,
  Box,
  Space,
  MultiSelect,
  Loader
} from '@mantine/core';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconPlus,
} from '@tabler/icons-react';
import axios from "axios";
import { notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import classes from './FoodsComponent.module.css';
// import { data as allData } from './ItemsComponent';

/* eslint-disable-next-line */
export interface FoodsComponentProps {}

interface RowData {
  id: string;
  name: string;
  price: number;
}
interface RowAllData {
  id: string;
  name: string;
  unit: string;
  price_per_unit: number;
  type: string;
}
interface Ingredient {
  item_id: string;
  name: string;
  unit: string;
  amount: number;
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
interface IngredientsDetailsProps {
  ingredients: Ingredient[];
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
      <TextInput label='Amount' placeholder='Please enter amount of item' type='number' value={itemAmount} onChange={(e) => setItemAmount(parseFloat(e.target.value))}></TextInput>
      <br />
      <Text><strong>Unit: </strong>{item.unit}</Text>
      <br />
      <Text><strong>Type: </strong> {item.type}</Text>
    </Group>
      
    );

  }
}

function IngredientsDetails ({ingredients} : IngredientsDetailsProps){  
  return (
    <>
    {ingredients.map((item, index) => (
        
      <Group key={index} style={{ marginTop: '10px' }}>
        <Text><strong>Name: </strong>{item.name}</Text>
        <br />
        <Text><strong>Amount: </strong>{item.amount}  {item.unit}</Text>
        </Group> 
        
    ))}
    </>
  ); 
}
function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((food) =>
    Object.keys(food).some((key) => {
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
// const data = [
//   {
//     name: 'Ghorme sabzi',
//     price: '10000',
//   },
//   {
//     name: 'Gheyme',
//     price: '1500',
//   },
//   {
//     name: 'Chicken',
//     price: '2000',
//   },
//   {
//     name: 'Fish',
//     price: '27000',
//   },
//   {
//     name: 'Falafel',
//     price: '30000',
//   },
//   {
//     name: 'Viola Bernhard',
//     price: '29000',
//   },
//   {
//     name: 'Austin Jacobi',
//     price: '31000',
//   },
//   {
//     name: 'Hershel Mosciski',
//     price: '35000',
//   },
//   {
//     name: 'Mylene Ebert',
//     price: '4000',
//   },
//   {
//     name: 'Lou Trantow',
//     price: '42000',
//   },
//   {
//     name: 'Dariana Weimann',
//     price: '45000',
//   },
//   {
//     name: 'Dr. Christy Herman',
//     price: '12000',
//   },
//   {
//     name: 'Katelin Schuster',
//     price: '18000',
//   },
//   {
//     name: 'Melyna Macejkovic',
//     price: '3500',
//   },
//   {
//     name: 'Pinkie Rice',
//     price: '5000',
//   },
//   {
//     name: 'Brain Kreiger',
//     price: '21000',
//   },
// ];

export function FoodsComponent(props: FoodsComponentProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [data, setData] = useState<RowData[]>([{id:"", name: "", price:0}]); // all items in specific warehouse
  const [sortedData, setSortedData] = useState(data);
  const [allDataNames, setAllDataNames] = useState<{id: string, name: string}[]>([{id: "", name: ""}]); // all items names in system
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingItem, setLoadingItem] = useState<boolean>(false) // loading specific item after searching
  const [itemLoaded, setItemLoaded] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [itemName, setItemName] = useState(['']);
  const [itemAmount, setItemAmount] = useState<number>(0); 
  const [foundItem, setFoundItem] = useState<RowAllData>({id: "", name: "", unit: "", price_per_unit: 0, type: ""});
  const [ingredients, setIngredients] = useState <{item_id: string,name: string, unit: string, amount: number}[]>([]);
  

  const getData = async () => {
    console.log("befor load foods")
    console.log(data);
    setLoading(true);
    await axios.get('http://localhost:3333/foods')
        .then(async (res) => {
          setData(res.data);
          setSortedData(res.data)
          console.log("after load foods")
          
        })
        
        .catch(error => {
          console.log("axios error in items page :(((")})

        setLoading(false);
        console.log("end of getData function")
        console.log(data)
  }  
  const getAllDataNames = async () => { // get all items names that are in defined in the system 
    setLoading(true);
    await axios.get('http://localhost:3333/warehouseItems/names')
        .then(res => {
        
          setAllDataNames(res.data); 
          setLoading(false);
        })
        
        .catch(error => {
          console.log("axios error in getAllDataNames function in warehouse page :(((")})
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
    getAllDataNames();
  }
  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setFoodName('');
    setPrice(0);
    setIngredients([]);
  }

  const handleOpenModal2 = () => {
    setIsModalOpen2(true);
    setItemAmount(0);
  }
  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
    setItemLoaded(false)
    setItemName(['']);
  }

  const handleAddFood = async () => {
    const newFood = {
      name: foodName,
      price: price,
    } 
    setLoading(true);
    await axios.post('http://localhost:3333/foods', newFood)
      .then(async (res) => {          
        console.log("food added: ",res.data)
        const foodId = res.data.id;
        await ingredients.map((item) => {
          axios.post('http://localhost:3333/ingredients', {...item, food_id: foodId})
            .then(res => {
              console.log("ingrdient added: ",res.data)
            })
            .catch(error => {
              setLoading(false)
              notifications.show({
                withBorder: true,
                title: 'Failed to add ingredients to food!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
             }
            )
            setLoading(false);
        })
        notifications.show({
          withBorder: true,
          title: 'Food added successfully!',
          message: '', 
          color: 'green',
          position: 'bottom-left',  
          style: {borderColor: 'green', width: '30rem' },
        });
        getData();
        console.log("after add food")
        console.log('new food:', newFood)
          
      })
          
      .catch(error => {

      setLoading(false);
      notifications.show({
                withBorder: true,
                title: 'Failed to add food!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
            })
    console.log("Food: ", newFood)
    handleCloseModal();
  
  };
  const handleAddIngridient = async  () => {
    setLoading(true)
    console.log("ingredients 1", ingredients)
    await setIngredients([...ingredients, {item_id: foundItem.id, name: foundItem.name, unit: foundItem.unit, amount: itemAmount}]);
    setLoading(false)
    console.log("ingredients 2", ingredients)
    handleCloseModal2();
    setItemName(['']);
    setItemAmount(0);
  };
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
  useEffect(() => {getData()}, []);
  
  if (loading) {
    console.log("loading")
    return <Loader type="dots" color="grape" />;
  }
  if (loadingItem) {
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
            <Space h="md"/>
            <Text ta="center" c="dimmed">__________________________________________</Text>
            <Text>item information:</Text>
            <Space h="md"/>

            <IngredientsDetails ingredients={ingredients} />

            <Modal opened={isModalOpen2} onClose={handleCloseModal2} title="Add an ingridient">
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
              <Button variant="outline" onClick={handleCloseModal2}>
                  Cancel
              </Button>
              <Button variant="filled" onClick={handleAddIngridient}>
                  Add
                </Button>
            </Group>

            </Box>
            </Modal>

            <Space h="md" />
          
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

            <Space h="md"/>
            <Text ta="center" c="dimmed">__________________________________________</Text>
            <Text>item information:</Text>
            <Space h="md"/>
            <IngredientsDetails ingredients={ingredients} />

            <Modal opened={isModalOpen2} onClose={handleCloseModal2} title="Add an ingridient">
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
            
            <ItemDetails item={foundItem} itemLoaded={itemLoaded} itemAmount={itemAmount} setItemAmount={setItemAmount}/>
            <Space h="md"/>
            <Group justify='center'grow>
              <Button variant="outline" onClick={handleCloseModal2}>
                  Cancel
              </Button>
              <Button variant="filled" onClick={handleAddIngridient}>
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
