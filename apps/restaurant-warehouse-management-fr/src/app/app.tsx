// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
// import NxWelcome from './nx-welcome';
import { Login } from './login';
import { ForgetPassword } from './forgetPassword'

import { Navigate, Route, Routes} from 'react-router-dom';

export function App() {
  return (
    <MantineProvider>

        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
        </Routes>
     
        {/* <Login /> */}
       {/* <ForgetPassword />  */}
        {/* <NxWelcome title="restaurant-warehouse-management-fr" />  */}
    </MantineProvider>
  );
}

export default App;
