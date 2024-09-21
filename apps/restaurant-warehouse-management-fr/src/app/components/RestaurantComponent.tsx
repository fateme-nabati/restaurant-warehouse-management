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
  Loader
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
  foods: string[]
}

interface Prepare {
  restaurant_id: string; 
  food_id: string; 
  date: string; 
  meal: string; 
  reserved_no: number; 
  bought_daily_no: number; 
  cooked_no: number; 
  delivered_no: number;
}

interface Restaurant {
  id: string;
  name: string;
}


// const data : RowData[] = [
//   {
//     date: 'saturday, June 1, 2024',
//     foods: ['Gheyme', 'Kabab'],
//   },
//   {
//     date: 'sunday, June 2, 2024',
//     foods: ['Ghorme sabzi', 'Cholo goosht'],
//   },
//   {
//     date: 'monday, June 3, 2024',
//     foods: ['Morgh', 'Khoresht khalal'], 
//   },
//   {
//     date: 'tuesday, June 4, 2024',
//     foods: ['Mahi', 'Falafel'], 
//   },
//   {
//     date: 'wednsday, June 5, 2024',
//     foods: ['Khoresht bademjoon', 'Makarooni'], 
//   },
//   {
//     date: 'thursday, June 6, 2024',
//     foods: ['10000', '7000'],
//   },
//   {
//     date: 'friday, June 7, 2024',
//     foods: ['10000', '7000'],
//   },
//   {
//     date: 'saturday, June 8, 2024',
//     foods: ['10000', '7000'],
//   },
//   {
//     date: 'sunday, June 9, 2024',
//     foods: ['10000', '7000'],
//   },
//   {
//     date: 'monday, June 10, 2024',
//     foods: ['10000', '7000'],
//   },
//   {
//     date: 'saturday, June 1, 2024',
//     foods: ['10000', '7000'],
//   },
//   {
//     date: 'saturday, June 1, 2024',
//     foods: ['10000', '7000'],
//   },
//   {
//     date: 'saturday, June 1, 2024',
//     foods: ['10000', '7000'],
//   },
//   {
//     date: 'saturday, June 1, 2024',
//     foods: ['10000', '7000'],
//   },
 
// ];

export function RestaurantComponent(props: RestaurantComponentProps) {

  const [restaurant, setRestaurant] = useState <Restaurant> ({id: "1", name: "centeral restaurant"});
  const [data, setData] = useState<RowData[]> ([])
  const [dateInfo, setDateInfo] = useState<Prepare[]>([{restaurant_id: "", food_id: "", date: "1970-01-01", meal: "", reserved_no: 0, bought_daily_no: 0, cooked_no: 0, delivered_no: 0}]); // all items in specific warehouse
  const [loading, setLoading] = useState <boolean> (true);
  const [restaurantName, setRestaurantName] = useState <string | null>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState <Date | null>(null);
  const [vade, setVade] = useState <string | null>(''); 
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
          console.log("axios error in getData function in restaurant page :(((")})
  }

  // const getAllDataNames = async () => { // get all items names that are in defined in the system 
  //   setLoading(true);
  //   await axios.get('http://localhost:3333/warehouseItems/names')
  //       .then(res => {
        
  //         setAllDataNames(res.data); 
  //         setLoading(false);
  //       })
        
  //       .catch(error => {
  //         console.log("axios error in getAllDataNames function in warehouse page :(((")})
  // }
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddItem = () => {
    handleCloseModal();
    setDate(null); 
    setVade('');
    setReservedNo(0);
    setDailyBoughtNo(0);
    setCookedNo(0);
    setDeliveredNo(0);
  };



  // const theme = useMantineTheme();
  const days = data.map((day) => (
    <Card key={day.date} shadow="md" radius="md" className={classes.card} padding="xl">
      <Anchor component={Link} variant="link" to='/dateInfo' fz="lg" fw={500} className={classes.cardDate}mt="md" ta="left" c="pink">
            {day.date}
      </Anchor>
      
      <Text fz="sm" c="dimmed" mt="sm">
        {day.foods.join(', ')}
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

           <Select label="Vade" placeholder="Select vade" data={['Break fast', 'Launch','Dinner']} value={vade} onChange={(_value, option) => setVade(_value)} />    

          <TextInput label="Number of reserved foods" placeholder="Enter number of reserved foods" type="number" value={reservedNo} onChange={(e) => setReservedNo(parseInt(e.target.value))} /> 

          <TextInput label="Number of daily bought foods" placeholder="Enter number of daily bought foods" type="number" value={dailyBoughtNo} onChange={(e) => setDailyBoughtNo(parseInt(e.target.value))} />

          <TextInput label="Number of cooked foods" placeholder="Enter number of cooked foods" type="number" value={cookedNo} onChange={(e) => setCookedNo(parseInt(e.target.value))} /> 

          <TextInput label="Number of delivered foods" placeholder="Enter number of delivered foods" type="number" value={deliveredNo} onChange={(e) => setDeliveredNo(parseInt(e.target.value))} /> 
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

      <SimpleGrid cols={1} spacing="xl" mt={50} >
        {days}
      </SimpleGrid>
      
        
         
               
    </ScrollArea>
  );
}

export default RestaurantComponent;


