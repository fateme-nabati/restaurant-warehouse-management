// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
// import NxWelcome from './nx-welcome';
import { Login } from './pages/login';
import { ForgetPassword } from './pages/forgetPassword'
import { Items } from './pages/items';
import { Warehouse } from './pages/warehouse';
import { Foods } from './pages/foods'
import { Restaurant } from './pages/restaurant'
import { Route, Routes} from 'react-router-dom';

export function App() {
  return (
    <MantineProvider>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Items" element={<Items />} />
          <Route path="/Warehouse" element={<Warehouse />} />
          <Route path="/Foods" element={<Foods />} />
          <Route path="/Restaurant" element={<Restaurant />} />
        </Routes>
     
       
    </MantineProvider>
  );
}

export default App;
