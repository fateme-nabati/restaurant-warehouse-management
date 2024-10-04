import { useState, useEffect } from 'react'
import { Group, Paper, SimpleGrid, Text, Loader, Space } from '@mantine/core';
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';
import classes from './DateInfoComponent.module.css';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from "axios"
import { notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { title } from 'process';


/* eslint-disable-next-line */
export interface DateInfoComponentProps {}

interface Restaurant {
  id: string;
  name: string;
  number_of_staff: number;
}

interface RowData {
  restaurant_id: string; 
  restaurant_name: string; 
  food_id: string; 
  food_name: string; 
  date: string; 
  meal: string; 
  reserved_no: number; 
  bought_daily_no: number; 
  cooked_no: number; 
  delivered_no: number;
}
interface Property {
  title: string;
  icon: string;
  value: string;
}

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

// const properties = [
//   { title: 'Number of cooked', icon: 'receipt', value: '13,456', diff: 34 },
//   { title: 'Number of reserved', icon: 'coin', value: '4,145', diff: -13 },
//   { title: 'Number of daily bought', icon: 'discount', value: '745', diff: 18 },
//   { title: 'Number of delivered', icon: 'user', value: '188', diff: -30 },
//   { title: 'Number of sookhte', icon: 'user', value: '188', diff: -30 },
//   { title: 'Number of staff food', icon: 'user', value: '188', diff: -30 },
//   { title: 'Number of wasted', icon: 'user', value: '188', diff: -30 },
// ] as const;

const initialProperties = [[
  { title: 'Number of cooked', icon: 'receipt', value: '' },
  { title: 'Number of reserved', icon: 'coin', value: '' },
  { title: 'Number of daily bought', icon: 'discount', value: '' },
  { title: 'Number of delivered', icon: 'user', value: '' },
  { title: 'Number of sookhte', icon: 'user', value: '' },
  { title: 'Number of wasted', icon: 'user', value: '' },
]];

  
export function DateInfoComponent(props: DateInfoComponentProps) {
  const [restaurant, setRestaurant] = useState <Restaurant> ({id: "1", name: "centeral restaurant", number_of_staff: 20});
  const [data, setData] = useState<RowData[]> ([])
  const [loading, setLoading] = useState <boolean> (true);
  const [properties, setProperties] = useState<Property[][]>(initialProperties)

  const location = useLocation();
  const { date } = queryString.parse(location.search);
  const dateString = Array.isArray(date) ? date[0] : date; 
  const getPrepares = async (date: string) => { 
    setLoading(true);
    await axios.get(`http://localhost:3333/prepare/restaurant/${restaurant.id}/date/${date}`)
        .then(res => {
          console.log("res.data: ", res.data)
          setData(res.data);
          setLoading(false);
        })
        
        .catch(error => {
            notifications.show({
                withBorder: true,
                title: 'Failed to recieve response from server in date info page!',
                message: JSON.stringify(error.response?.data), 
                color: 'red',
                position: 'bottom-left',
                style: {borderColor: 'red', width: '30rem' },
              });
        })
  }
  
  useEffect(() => {
    if (dateString) {
      getPrepares(dateString);
    }
  }, [dateString]);

  
  useEffect(() => {
    if (!loading && data.length > 0) {
      const newProperties = data.map((food) => {
        return [
          { title: 'Number of cooked', icon: 'receipt', value: String(food.cooked_no) },
          { title: 'Number of reserved', icon: 'coin', value: String(food.reserved_no) },
          { title: 'Number of daily bought', icon: 'discount', value: String(food.bought_daily_no) },
          { title: 'Number of delivered', icon: 'user', value: String(food.delivered_no) },
          { title: 'Number of sookhte', icon: 'user', value: String(food.reserved_no + food.bought_daily_no - food.delivered_no) }, // sookhte food
          { title: 'Number of wasted', icon: 'user', value: String(food.cooked_no - food.delivered_no) }, // wasted food
        ];
      });
      
      // Now set properties with the new 2D array
      setProperties(newProperties);
    }
      // data.map((food, index) => (
      //   const newProperties = [...properties]; 
      //   console.log("properties before assignment: ", properties)
      //   console.log("date before assignment: ", data)
      //   newProperties[index][0].value = String(food.cooked_no);
      //   newProperties[index][1].value = String(food.reserved_no);
      //   newProperties[index][2].value = String(food.bought_daily_no);
      //   newProperties[index][3].value = String(food.delivered_no);
      //   newProperties[index][4].value = String(food.reserved_no + food.bought_daily_no - food.delivered_no); // sookhte food
      //   newProperties[index][5].value = String(data[0].cooked_no - data[0].delivered_no); // wasted food
        // console.log("properties after assignment: ", properties)
        // properties bayad ye array beshe va be ezaye har food, yeki as index hash por beshe (inja bayad halghe bezarim)
        // setProperties(newProperties);
    //   ))
    // }
  }, [loading, data])
      const stats = properties.map((property) => {
        return property.map((stat) => {
        // const Icon = icons[stat.icon];
        const Icon = icons["coin"];
        // const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
          <Paper withBorder p="md" radius="md" key={stat.title}>
            <Group justify="space-between">
              <Text size="xs" c="dimmed" className={classes.title}>
                {stat.title}
              </Text>
              <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
            </Group>

            <Group align="flex-end" gap="xs" mt={25}>
              <Text className={classes.value}>{stat.value}</Text>
            </Group>
          </Paper>
        );
      })
      });


  if(loading){
    console.log("loading")
    return <Loader type="dots" color="grape" />;
  }
  return ( 
    <div className={classes.root}>
      <Text size="lg" variant="gradient" gradient={{ from: 'cyan', to: 'green', deg: 90 }} className={classes.title}>Foods information in date {date} :
      </Text>   
      <Space h="md"/>
      
      {
        stats.map((stat, index) => (
          <div key={index}>
          <Text size="md" c='teal' className={classes.title}>{data[index].food_name} :</Text>     
          <Space h="md"/>
          <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stat}</SimpleGrid>
          <Space h="md"/>
          </div>
        ))
      }
    </div>
   
  );
}