// import styles from './AppShell.module.css';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HeaderComponent from '../components/HeaderComponent';
import NavbarComponent from '../components/NavbarComponent';
import ItemsComponent from '../components/ItemsComponent';

/* eslint-disable-next-line */
export interface ItemsProps {} 

export function Items(props: ItemsProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <HeaderComponent />
      <NavbarComponent activeLabel='Items'/>
      <AppShell.Main>
        <ItemsComponent />
      </AppShell.Main>
    </AppShell>
  );
}