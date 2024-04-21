// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import NxWelcome from './nx-welcome';
import { Login } from './login';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  return (
    <MantineProvider>
      <Login />
      {/* <NxWelcome title="restaurant-warehouse-management-fr" /> */}
    </MantineProvider>
  );
}

export default App;
