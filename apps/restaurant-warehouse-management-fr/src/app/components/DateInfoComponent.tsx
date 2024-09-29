import { useState } from 'react'
import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
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

/* eslint-disable-next-line */
export interface DateInfoComponentProps {}

interface Restaurant {
  id: string;
  name: string;
}

interface RowData {
  restaurant_id: string; 
  food_id: string; 
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

const data = [
  { title: 'Number of cooked', icon: 'receipt', value: '13,456', diff: 34 },
  { title: 'Number of reserved', icon: 'coin', value: '4,145', diff: -13 },
  { title: 'Number of daily bought', icon: 'discount', value: '745', diff: 18 },
  { title: 'Number of delivered', icon: 'user', value: '188', diff: -30 },
  { title: 'Number of sookhte', icon: 'user', value: '188', diff: -30 },
  { title: 'Number of staff food', icon: 'user', value: '188', diff: -30 },
  { title: 'Number of wasted', icon: 'user', value: '188', diff: -30 },
] as const;

export function DateInfoComponent(props: DateInfoComponentProps) {
  const [restaurant, setRestaurant] = useState <Restaurant> ({id: "1", name: "centeral restaurant"});
  const [data, setData] = useState<RowData[]> ([])
  const location = useLocation();
  const { date } = queryString.parse(location.search);
  const getFoods = async (date: string) => { 
    // setLoading(true);
    await axios.get(`http://localhost:3333/prepare/restaurant/${restaurant.id}/${food_id}`)
        .then(res => {
        
          setData(res.data);
          // setLoading(false);
        })
        
        .catch(error => {
          console.log("axios error in getData function in restaurant page :(((")})
  }
  const getData = async (food_id: string) => { 
    // setLoading(true);
    await axios.get(`http://localhost:3333/prepare/${restaurant.id}/${food_id}`)
        .then(res => {
        
          setData(res.data);
          // setLoading(false);
        })
        
        .catch(error => {
          console.log("axios error in getData function in restaurant page :(((")})
  }

  foods_ids.map()
  stats[index] = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

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
          <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return ( 
  <>
    {foods_ids.map((food, index) => (
    <div className={classes.root}>
      <Text>{date} :</Text>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats[index]}</SimpleGrid>
    </div>
    ))}
  </>
  );
}