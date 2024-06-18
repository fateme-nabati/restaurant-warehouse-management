// import styles from './AppShell.module.css';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HeaderComponent from '../components/HeaderComponent';
import NavbarComponent from '../components/NavbarComponent';
import WarehouseComponent from '../components/WarehouseComponent';

/* eslint-disable-next-line */
export interface WarehouseProps {} 

export function Warehouse(props: WarehouseProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
     
       <HeaderComponent />   
       <NavbarComponent activeLabel='Warehouse'/>
      
      <AppShell.Main>
        <WarehouseComponent />
      </AppShell.Main>
    </AppShell>
  );
}