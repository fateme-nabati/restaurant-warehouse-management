// import styles from './AppShell.module.css';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HeaderComponent from '../components/HeaderComponent';
import NavbarComponent from '../components/NavbarComponent';

/* eslint-disable-next-line */
export interface DashboardProps {} 

export function Dashboard(props: DashboardProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      {/* <AppShell.Header> */}
        <HeaderComponent />
      {/* </AppShell.Header> */}
      {/* <AppShell.Navbar p="md"> */}
       <NavbarComponent />
      {/* </AppShell.Navbar> */}
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
