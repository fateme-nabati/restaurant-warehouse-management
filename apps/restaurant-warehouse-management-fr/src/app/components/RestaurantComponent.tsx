import { useState, useEffect } from 'react';
import {
  ScrollArea,
  Group,
  Text,
  TextInput,
  rem, 
  Button,
  Modal,
  Box,
  Space,
  Select,
  Card,
  SimpleGrid,
  Anchor,
  Loader,
  // MultiSelect
} from '@mantine/core';
import { DateInput } from '@mantine/dates'
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom'
import axios from "axios"
import { notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import classes from './RestaurantComponent.module.css';

/* eslint-disable-next-line */
export interface RestaurantComponentProps {}

interface RowData {
  date: string;
  meal: string;
  foods: {
    id: string;
    name: string;
   
  }[]
}

interface Prepare {
  restaurant_id: string; 
  food_id: string; 
  date: Date | null; 
  meal: string | null; 
  reserved_no: number; 
  bought_daily_no: number; 
  cooked_no: number; 
  delivered_no: number;
}

interface Restaurant {
  id: string;
  name: string;
}

interface Food {
  id: string;
  name: string | null;
}

export function RestaurantComponent(props: RestaurantComponentProps) {

  const [restaurant, setRestaurant] = useState <Restaurant> ({id: "1", name: "centeral restaurant"});
  const [data, setData] = useState<RowData[]> ([])
  // const [dateInfo, setDateInfo] = useState<Prepare[]>([{restaurant_id: "", food_id: "", date: "1970-01-01", meal: "", reserved_no: 0, bought_daily_no: 0, cooked_no: 0, delivered_no: 0}]); 
  const [loading, setLoading] = useState <boolean> (true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantName, setRestaurantName] = useState <string | null>('');const [allFoodsNames, setAllFoodsNames] = useState<{id: "", name: ""}[]>([{id: "", name: ""}]); // all foods names in system
  const [date, setDate] = useState <Date | null>(null);
  const [meal, setMeal] = useState <string | null>(''); 
  const [foodName, setFoodName] = useState<string | null>(''); 
  const [reservedNo, setReservedNo] = useState(0);
  const [dailyBoughtNo, setDailyBoughtNo] = useState(0);
  const [cookedNo, setCookedNo] = useState(0);
  const [deliveredNo, setDeliveredNo] = useState(0);

  const getData = async () => { // get foods that are in specific restaurant
    setLoading(true);
    await axios.get(`http://localhost:3333/prepare/restaurant/${restaurant.id}/date`)
        .then(res => {
        
          setData(res.data);
          setLoading(false);
        })
        
        .catch(error => {
          // console.log("axios error in getData function in restaurant page :(((")})
            notifications.show({
                withBorder: true,
                title: 'Failed to recieve response from server in restaurant page!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
        })
  }
  const getFoodsNames = async () => { // get all foods names that are defined in the system 
    setLoading(true);
    await axios.get('http://localhost:3333/foods')
        .then(res => {
          console.log("res.data: ", res.data)
          setAllFoodsNames(res.data); 
          setLoading(false);
        })
        
        .catch(error => { 
          notifications.show({
                withBorder: true,
                title: 'Failed to get foods names from the server in restaurant page!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
          })
  }
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
    getFoodsNames();
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDate(null); 
    setMeal('');
    setFoodName('');
    setReservedNo(0);
    setDailyBoughtNo(0);
    setCookedNo(0);
    setDeliveredNo(0);
  }
  // const handleAddItem = () => {
  //   handleCloseModal();
  //   setDate(null); 
  //   setVade('');
  //   setReservedNo(0);
  //   setDailyBoughtNo(0);
  //   setCookedNo(0);
  //   setDeliveredNo(0);
  // };
  const handleAddPrepare = async () => {
    const food = await allFoodsNames.filter((food) => {return food.name === foodName})

    const foodId = food[0].id;
    const newPrepare: Prepare = {
      restaurant_id: restaurant.id,
      food_id: foodId,
      date: date,
      meal: meal,
      reserved_no: reservedNo,
      bought_daily_no: dailyBoughtNo,
      cooked_no: cookedNo,
      delivered_no: deliveredNo,
      };
      setLoading(true);
      await axios.post('http://localhost:3333/prepare', newPrepare)
          .then(res => {  
            setLoading(false);
           
            notifications.show({
              withBorder: true,
              title: 'food added to restaurant menu successfully!',
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
                title: 'Failed to add food to restaurant!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
            })
    
    handleCloseModal();
  
  };

  // const theme = useMantineTheme();
  const days = data.map((day) => (
    <Card key={day.date} shadow="md" radius="md" className={classes.card} padding="xl">
      <Anchor component={Link} variant="link" to={`/dateInfo?date=${encodeURIComponent(day.date)}`} fz="lg" fw={500} className={classes.cardDate}mt="md" ta="left" c="pink">
            {day.date} 
      </Anchor>
      
      <Text fz="sm" c="dimmed" mt="sm">
        {
        day.foods.map((food) => food.name).join(', ')
        }
      </Text>
    </Card>
  ));
  useEffect(() => {getData()}, []);
 if(loading){
    console.log("loading")
    return <Loader type="dots" color="grape" />;
  }
  return (
    <ScrollArea>
     
      <Box style={{ display: 'flex', width: '100%' }}>

      <Select placeholder="Select a restaurant" data={['central restaurant', 'basic science restaurant']} value={restaurantName} onChange={(_value, option) => setRestaurantName(_value)} style={{ width: '70%' }}
          />        
     
      <Button variant="filled" color="green" size="md-compact" ml={50}  leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} stroke={2} />} onClick={handleOpenModal} >Add</Button>
       
      <Modal opened={isModalOpen} onClose={handleCloseModal} title="Add information about new day">
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <DateInput size="xs" clearable defaultValue={new Date()} label="Date" placeholder="Enter date" value={date} onChange={(_value) => setDate(_value)} />

           <Select label="Meal" placeholder="Select meal" data={['break fast', 'lunch','dinner']} value={meal} onChange={(_value, option) => setMeal(_value)} />    
          {/* <MultiSelect
              label=" Food"
              placeholder="Search an item"
              limit={5}
              data={foodsNames.map((food) => food.name)}
              maxValues={2}  
              value={food}
              nothingFoundMessage="Nothing found..."
              onChange={(values) => setFood(values)}
              searchable
            />  */}
            <Select
              label=" Food"
              placeholder="Search a food" 
              limit={5}
              data={allFoodsNames.map((food) => food.name)}
              value={foodName}
              nothingFoundMessage="Nothing found..."
              onChange={(_value, option) => setFoodName(_value)}
              searchable
            />  
            <Space h="md"/>
          <TextInput label="Number of reserved foods" placeholder="Enter number of reserved foods" type="number" value={reservedNo} onChange={(e) => setReservedNo(parseInt(e.target.value))} /> 

          <TextInput label="Number of daily bought foods" placeholder="Enter number of daily bought foods" type="number" value={dailyBoughtNo} onChange={(e) => setDailyBoughtNo(parseInt(e.target.value))} />

          <TextInput label="Number of cooked foods" placeholder="Enter number of cooked foods" type="number" value={cookedNo} onChange={(e) => setCookedNo(parseInt(e.target.value))} /> 

          <TextInput label="Number of delivered foods" placeholder="Enter number of delivered foods" type="number" value={deliveredNo} onChange={(e) => setDeliveredNo(parseInt(e.target.value))} /> 
          <Space h="md"/>
          <Group justify='center'grow>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="filled" onClick={handleAddPrepare}>
              Add
            </Button>
          </Group>

        </Box>
      </Modal>
      </Box>

      <SimpleGrid cols={1} spacing="xl" mt={50} >
        {days}
      </SimpleGrid>
      
        
         
               
    </ScrollArea>
  );
}

export default RestaurantComponent;


