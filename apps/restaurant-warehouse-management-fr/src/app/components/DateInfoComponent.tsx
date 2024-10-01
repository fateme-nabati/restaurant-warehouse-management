import { useState, useEffect } from 'react'
import { Group, Paper, SimpleGrid, Text, Loader } from '@mantine/core';
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

const properties = [
  { title: 'Number of cooked', icon: 'receipt', value: '' },
  { title: 'Number of reserved', icon: 'coin', value: '' },
  { title: 'Number of daily bought', icon: 'discount', value: '' },
  { title: 'Number of delivered', icon: 'user', value: '' },
  { title: 'Number of sookhte', icon: 'user', value: '' },
  { title: 'Number of staff food', icon: 'user', value: '' },
  { title: 'Number of wasted', icon: 'user', value: '' },
];

export function DateInfoComponent(props: DateInfoComponentProps) {
  const [restaurant, setRestaurant] = useState <Restaurant> ({id: "1", name: "centeral restaurant", number_of_staff: 20});
  const [data, setData] = useState<RowData[]> ([])
  const [loading, setLoading] = useState <boolean> (true);
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
          // console.log("axios error in getData function in restaurant page :(((")
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
  // const getData = async (food_id: string) => { 
  //   // setLoading(true);
  //   await axios.get(`http://localhost:3333/prepare/${restaurant.id}/${food_id}`)
  //       .then(res => {
        
  //         setData(res.data);
  //         // setLoading(false);
  //       })
        
  //       .catch(error => {
  //         console.log("axios error in getData function in restaurant page :(((")})
  // }

  useEffect(() => {
    if (dateString) {
      getPrepares(dateString);
    }
  }, [dateString]);

  useEffect(() => {
    if (!loading && data.length > 0) {
      // properties.map((property, index) => property.value = data[0].)
      properties[0].value = String(data[0].cooked_no);
      properties[1].value = String(data[0].reserved_no);
      properties[2].value = String(data[0].bought_daily_no);
      properties[3].value = String(data[0].delivered_no);
      properties[4].value = String(data[0].reserved_no + data[0].bought_daily_no - data[0].delivered_no); // sookhte food
      properties[5].value = String(data[0].delivered_no); // staff food
      properties[6].value = String(data[0].cooked_no - data[0].delivered_no - restaurant.number_of_staff); // wasted food
    // properties bayad ye array beshe va be ezaye har food, yeki as index hash por beshe (inja bayad halghe bezarim)
    }
  }, [loading, data])
  
      const stats = properties.map((stat) => {
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
              {/* <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
                <span>{stat.diff}%</span>
                <DiffIcon size="1rem" stroke={1.5} />
              </Text> */}
            </Group>
    {/* 
            <Text fz="xs" c="dimmed" mt={7}>
              Compared to previous month
            </Text> */}
          </Paper>
        );
      });


  if(loading){
    console.log("loading")
    return <Loader type="dots" color="grape" />;
  }
  return ( 
    <div className={classes.root}>
      <Text>{date} :</Text>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
   
  );
}