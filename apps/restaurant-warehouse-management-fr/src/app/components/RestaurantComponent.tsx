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
  Anchor,
 
 
} from '@mantine/core';
import { DateInput } from '@mantine/dates'
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



const data : RowData[] = [
  {
    date: 'saturday, June 1, 2024',
    foods: ['Gheyme', 'Kabab'],
  },
  {
    date: 'sunday, June 2, 2024',
    foods: ['Ghorme sabzi', 'Cholo goosht'],
  },
  {
    date: 'monday, June 3, 2024',
    foods: ['Morgh', 'Khoresht khalal'], 
  },
  {
    date: 'tuesday, June 4, 2024',
    foods: ['Mahi', 'Falafel'], 
  },
  {
    date: 'wednsday, June 5, 2024',
    foods: ['Khoresht bademjoon', 'Makarooni'], 
  },
  {
    date: 'thursday, June 6, 2024',
    foods: ['10000', '7000'],
  },
  {
    date: 'friday, June 7, 2024',
    foods: ['10000', '7000'],
  },
  {
    date: 'saturday, June 8, 2024',
    foods: ['10000', '7000'],
  },
  {
    date: 'sunday, June 9, 2024',
    foods: ['10000', '7000'],
  },
  {
    date: 'monday, June 10, 2024',
    foods: ['10000', '7000'],
  },
  {
    date: 'saturday, June 1, 2024',
    foods: ['10000', '7000'],
  },
  {
    date: 'saturday, June 1, 2024',
    foods: ['10000', '7000'],
  },
  {
    date: 'saturday, June 1, 2024',
    foods: ['10000', '7000'],
  },
  {
    date: 'saturday, June 1, 2024',
    foods: ['10000', '7000'],
  },
 
];

export function RestaurantComponent(props: RestaurantComponentProps) {

  // const [opened, { open, close }] = useDisclosure(false);
  const [restaurantName, setRestaurantName] = useState <string | null>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState <Date | null>(null);
  const [vade, setVade] = useState <string | null>(''); 
  const [reservedNo, setReservedNo] = useState(0);
  const [dailyBoughtNo, setDailyBoughtNo] = useState(0);
  const [cookedNo, setCookedNo] = useState(0);
  const [deliveredNo, setDeliveredNo] = useState(0);

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



  const theme = useMantineTheme();
  const days = data.map((day) => (
    <Card key={day.date} shadow="md" radius="md" className={classes.card} padding="xl">
      <Anchor component="button" fz="lg" fw={500} className={classes.cardDate}mt="md" ta="left" c="pink">
            {day.date}
      </Anchor>
      
      <Text fz="sm" c="dimmed" mt="sm">
        {day.foods.join()}
      </Text>
    </Card>
  ));
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

