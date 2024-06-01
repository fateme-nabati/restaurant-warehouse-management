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
  Select,
  useMantineTheme,
  Card,
  SimpleGrid,
  Anchor
 
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconPlus } from '@tabler/icons-react';
import classes from './RestaurantComponent.module.css';

/* eslint-disable-next-line */
export interface RestaurantComponentProps {}

interface RowData {
  date: string;
  foods: Array<string>;
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



const data = [
  {
    date: 'saturday, June 1, 2024',
    foods: ['10000', '7000'],
  },
  {
    date: 'Gheyme',
    foods: ['10000', '3000'],
  },
  {
    date: 'Chicken',
    foods: ['2000'], 
  },
  {
    date: 'Fish',
    foods: ['27000'], 
  },
  {
    date: 'Falafel',
    foods: ['30000'], 
  },
  {
    date: 'Viola Bernhard',
    foods: ['29000'], 
  },
  {
    date: 'Austin Jacobi',
    foods: ['31000'], 
  },
  {
    date: 'Hershel Mosciski',
    foods: ['35000'], 
  },
  {
    date: 'Mylene Ebert',
    foods: ['4000'], 
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

export function RestaurantComponent(props: RestaurantComponentProps) {

  // const [opened, { open, close }] = useDisclosure(false);
  const [restaurantName, setRestaurantName] = useState <string | null>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState(0);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddItem = () => {
    handleCloseModal();
    setFoodName(''); // Reset form after adding
    setPrice(0);
  };



  const theme = useMantineTheme();
  const days = data.map((day) => (
    <Card key={day.date} shadow="md" radius="md" className={classes.card} padding="xl">
       <Anchor component="button" fz="lg" fw={500} className={classes.cardDate}mt="md" ta="left" c="pink">
            {day.date}
       </Anchor>
      {/* <Text fz="lg" fw={500} className={classes.cardDate} mt="md">
        {day.date}
      </Text> */}
      <Text fz="sm" c="dimmed" mt="sm">
        {day.foods}
      </Text>
    </Card>
  ));
  return (
    <ScrollArea>
     
      <Box style={{ display: 'flex', width: '100%' }}>

      <Select placeholder="Select a restaurant" data={['central restaurant', 'basic science restaurant']} value={restaurantName} onChange={(_value, option) => setRestaurantName(_value)} style={{ width: '70%' }}
          />        
     
      <Button variant="filled" color="green" size="md-compact" ml={50}  leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} stroke={2} />} onClick={handleOpenModal} >Add</Button>
       
      <Modal opened={isModalOpen} onClose={handleCloseModal} title="Add a food">
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <TextInput label="Food Name" placeholder="Enter food name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
           
          <TextInput label="Price per plate" placeholder="Enter price" type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />
    
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

