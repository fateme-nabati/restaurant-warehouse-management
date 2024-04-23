// import styles from './AppShell.module.css';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HeaderComponent from './HeaderComponent';
import NavbarComponent from './NavbarComponent';

// /* eslint-disable-next-line */
// export interface AppShellProps {} 

export function AppShellComponent() {
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