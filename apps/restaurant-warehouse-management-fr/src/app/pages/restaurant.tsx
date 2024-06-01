// import styles from './AppShell.module.css';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HeaderComponent from '../components/HeaderComponent';
import NavbarComponent from '../components/NavbarComponent';
import RestaurantComponent from '../components/RestaurantComponent';

/* eslint-disable-next-line */
export interface RestaurantProps {} 

export function Restaurant(props: RestaurantProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <HeaderComponent />
      <NavbarComponent />
      <AppShell.Main>
        <RestaurantComponent />
      </AppShell.Main>
    </AppShell>
  );
}