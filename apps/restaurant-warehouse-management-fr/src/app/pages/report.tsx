// import styles from './AppShell.module.css';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HeaderComponent from '../components/HeaderComponent';
import NavbarComponent from '../components/NavbarComponent';
import ReportComponent from '../components/ReportComponent';

/* eslint-disable-next-line */
export interface ReportProps {} 

export function Report(props: ReportProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
     
       <HeaderComponent />   
       <NavbarComponent activeLabel='Report'/>
      
      <AppShell.Main>
        <ReportComponent />
      </AppShell.Main>
    </AppShell>
  );
}