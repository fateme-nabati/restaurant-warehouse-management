// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { AppShell, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
// import NxWelcome from './nx-welcome';
import { Login } from './pages/login';
import { ForgetPassword } from './pages/forgetPassword'
import { Items } from './pages/items';
import { Navigate, Route, Routes} from 'react-router-dom';

export function App() {
  return (
    <MantineProvider>

        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/items" element={<Items />} />
        </Routes>
     
        {/* <Login /> */}
       {/* <ForgetPassword />  */}
        {/* <NxWelcome title="restaurant-warehouse-management-fr" />  */}
    </MantineProvider>
  );
}

export default App;
