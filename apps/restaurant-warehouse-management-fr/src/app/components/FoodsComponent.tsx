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
  Loader,
  ActionIcon,
  Tooltip
} from '@mantine/core';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconPlus,
  IconPencil,
  IconEraser,
  IconList,
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
  item_name: string;
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
        <Text><strong>Name: </strong>{item.item_name}</Text>
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

export function FoodsComponent(props: FoodsComponentProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [data, setData] = useState<RowData[]>([{id:"", name: "", price:0}]); // all items in specific warehouse
  const [sortedData, setSortedData] = useState(data);
  const [allDataNames, setAllDataNames] = useState<{id: string, name: string}[]>([{id: "", name: ""}]); // all items names in system
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingItem, setLoadingItem] = useState<boolean>(false) // loading specific item after searching
  const [itemLoaded, setItemLoaded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>('add'); // add or edit food information
  const [isModalOpen2, setIsModalOpen2] = useState(false); // add ingredient to food
  const [isModalOpen3, setIsModalOpen3] = useState(false); // show food's ingredient
  const [isModalOpen4, setIsModalOpen4] = useState(false); // confirm to delete food
  const [foodId, setFoodId] = useState('');
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [itemName, setItemName] = useState(['']);
  const [itemAmount, setItemAmount] = useState<number>(0); 
  const [foundItem, setFoundItem] = useState<RowAllData>({id: "", name: "", unit: "", price_per_unit: 0, type: ""});
  const [ingredients, setIngredients] = useState <{item_id: string,item_name: string, unit: string, amount: number}[]>([]);
  

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
    setModalType("add");
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
  const handleOpenModal3 = () => {
      setIsModalOpen3(true);
    }
    const handleCloseModal3 = () => {
      setIsModalOpen3(false); 
      setFoodName('');
      setPrice(0);
      setIngredients([]);
    }
    const handleOpenModal4 = (food_id: string, food_name: string) => {
      setFoodId(food_id);
      setFoodName(food_name);
      setIsModalOpen4(true);
   
  }
  const handleCloseModal4 = () => {
    setIsModalOpen4(false); 
    setFoodName('');
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

  const handleEditFood = async () => {
    const editedFood = {
      name: foodName,
      price: price,
    } 
    setLoading(true);
    await axios.put(`http://localhost:3333/foods/${foodId}`, editedFood)
      .then(async (res) => {          
        console.log("food edited: ",res.data)
        // const foodId = res.data.id;
        await axios.delete(`http://localhost:3333/ingredients/food/${foodId}`)
          .then(async (res) => {
            await ingredients.map((item) => {
            axios.post('http://localhost:3333/ingredients/', {...item, food_id: foodId})
              .then(res => {
                console.log("ingrdient edited: ",res.data)
              })
              .catch(error => {
                setLoading(false)
                notifications.show({
                  withBorder: true,
                  title: 'Failed to edit ingredients!',
                  message: JSON.stringify(error.response?.data), 
                  color: 'red',
                  position: 'bottom-left',
                  style: {borderColor: 'red', width: '30rem' },
                });
              })
              
          })
          setLoading(false); // food edited and all ingredients added seccessfully
          notifications.show({
            withBorder: true,
            title: 'Food edited successfully!',
            message: '', 
            color: 'green',
            position: 'bottom-left',  
            style: {borderColor: 'green', width: '30rem' },
          });
          getData();
          console.log("after edit food")
          console.log('edited food:', editedFood)
            
        })
        .catch(error => {
          setLoading(false);
          notifications.show({
                withBorder: true,
                title: 'Failed to delete ingredients!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
        })
      })
      .catch(error => {

        setLoading(false);
        notifications.show({
                withBorder: true,
                title: 'Failed to edit food!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
            })
        
          
      
    console.log("Food: ", editedFood)
    handleCloseModal();
  
  }
  const handleDeleteFood = () => {
    setLoading(true);
    axios.delete(`http://localhost:3333/foods/${foodId}`)
      .then(res =>{
        console.log("delete food: ", res.data)
        setLoading(false);
        notifications.show({
          withBorder: true,
          title: 'Food deleted successfully!',
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
          title: 'Failed to delete food!',
          message: JSON.stringify(error.response?.data), 
          color: 'red',
          position: 'bottom-left',
          style: {borderColor: 'red', width: '30rem' },
        });
      })
      handleCloseModal4();
  }
  const handleAddIngridient = async  () => {
    setLoading(true)
    console.log("ingredients 1", ingredients)
    await setIngredients([...ingredients, {item_id: foundItem.id, item_name: foundItem.name, unit: foundItem.unit, amount: itemAmount}]);
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
 
  const showIngredients = (food_id: string, food_name: string) => {
    setLoading(true);
    axios.get(`http://localhost:3333/ingredients/food/${food_id}`)
      .then(res =>{
        console.log("show ingredients: ", res.data)
          setFoodName(food_name);
          setIngredients(res.data);
          setLoading(false);
          handleOpenModal3();
        
      })
      .catch(error => {
        setLoading(false);
        notifications.show({
          withBorder: true,
          title: 'Failed to show ingredients!',
          message: JSON.stringify(error.response?.data), 
          color: 'red',
          position: 'bottom-left',
          style: {borderColor: 'red', width: '30rem' },
        });
      })
  } 
  const editFood = (food_id: string, food_name: string, food_price: number) => {
    setLoading(true);
    axios.get(`http://localhost:3333/ingredients/food/${food_id}`)
      .then(res =>{
        console.log("edit food: ", res.data)
          setFoodId(food_id)
          setFoodName(food_name);
          setPrice(food_price);
          setIngredients(res.data);
          setModalType("edit");
          setLoading(false);
          handleOpenModal();
        
      })
      .catch(error => {
        setLoading(false);
        notifications.show({
          withBorder: true,
          title: 'Failed to edit food!',
          message: JSON.stringify(error.response?.data), 
          color: 'red',
          position: 'bottom-left',
          style: {borderColor: 'red', width: '30rem' },
        });
      })
  }

  
  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.price}</Table.Td>
      <Table.Td style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <Group>
        <Tooltip label="View Ingredients" position="top">
          <ActionIcon variant="outline" color='gray' size='sm' onClick={() => showIngredients(row.id, row.name)} >
            <IconList size={12} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Edit Food" position="top">
          <ActionIcon variant="outline" color='gray' size='sm' onClick={() => editFood(row.id, row.name, row.price)}>
            <IconPencil size={12} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Food" position="top" onClick={() => handleOpenModal4(row.id, row.name)}>
          <ActionIcon variant="outline" color='gray' size='sm'>
            <IconEraser size={12} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
      </Table.Td>
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
          title="Add/Edit a food"
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
              {
                modalType === 'add' ?
                <Button variant="filled" onClick={handleAddFood}>
                Add
                </Button> :
                <Button variant="filled" onClick={handleEditFood}>
                Edit
                </Button>

              }
              
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
          title="Add/Edit a food"
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
            <Group justify="center" grow>
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              {
                modalType === 'add' ?
                <Button variant="filled" onClick={handleAddFood}>
                Add
                </Button> :
                <Button variant="filled" onClick={handleEditFood}>
                Edit
                </Button>

              }
             
            </Group>
          </Box>
        </Modal>
      </Box>
      <Modal 
        opened={isModalOpen3}
        onClose={handleCloseModal3}
        title="Food Ingredients"
      >
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <>
            <Text c='blue'>{foodName}'s ingredients:</Text>
            <Space h="md" />
            {ingredients.length > 0 ? 
            <IngredientsDetails ingredients={ingredients} /> : <Text>No ingredient</Text>}
          </>
          
        </Box>
      </Modal>
      <Modal 
        opened={isModalOpen4}
        onClose={handleCloseModal4}
        title="Confirm delete food"
      >
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <>
            <Text>Are you sure to delete "{foodName}" and its information?</Text>
            <Space h="md" />
            <Group justify="center" grow>
              <Button variant="outline" color="gray" onClick={handleCloseModal4}>
                Cancel
              </Button>
             
              <Button variant="filled" color='red' onClick={handleDeleteFood}>
              Delete
              </Button>   
            </Group>
          </>
          
        </Box>
      </Modal>
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
