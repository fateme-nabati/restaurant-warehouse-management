// import styles from './AppShell.module.css';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HeaderComponent from '../components/HeaderComponent';
import NavbarComponent from '../components/NavbarComponent';
import FoodsComponent from '../components/FoodsComponent';

/* eslint-disable-next-line */
export interface FoodsProps {} 

export function Foods(props: FoodsProps) {
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
        <FoodsComponent />
      </AppShell.Main>
    </AppShell>
  );
}