// import styles from './AppShell.module.css';
import { AppShell, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HeaderComponent from '../components/HeaderComponent';
import NavbarComponent from '../components/NavbarComponent';
import { DateInfoComponent } from '../components/DateInfoComponent';

/* eslint-disable-next-line */
export interface DateInfoProps {} 

export function DateInfo(props: DateInfoProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <HeaderComponent />
      <NavbarComponent activeLabel='Restaurant'/>
      <AppShell.Main>
       {/* <Text ml={50}>Saturday June, 1, 2024</Text>
       <Text ml={50}>Ghorme  sabzi :</Text> */}
        <DateInfoComponent />
      </AppShell.Main>
    </AppShell>
  );
}