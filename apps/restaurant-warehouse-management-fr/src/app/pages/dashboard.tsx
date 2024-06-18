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
      
      <HeaderComponent /> 
      <NavbarComponent activeLabel='Dashboard'/> 
      <AppShell.Main>This Is Dashboard Page</AppShell.Main>

    </AppShell>
  );
}
