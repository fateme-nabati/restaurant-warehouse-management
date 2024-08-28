// import styles from './AppShell.module.css';
import { useEffect, useState } from "react"
import axios from "axios";
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import HeaderComponent from '../components/HeaderComponent';
import NavbarComponent from '../components/NavbarComponent';
// import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface DashboardProps {} 

// interface RowData {
//   personnel_code: string;
//   national_code: string;
//   first_name: string;
//   last_name: string;
//   birth_date: Date;
//   phone_number: string;
//   password: string;
 
// }

interface RowData {
  message: string;
}
export function Dashboard(props: DashboardProps) {
  // const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(); 
  const [response, setResponse] = useState<RowData>({message: ""});
  // const [password, setPassword] = useState('');
  const getResponse = () => {
    // console.log("axios getUsers");
    axios.get('http://localhost:3333')
        .then(res => {
            if (res.data) {
              setResponse(res.data)
               
              }
           
        })
        .catch(error => {console.log("axios error in dashboard page :(((")})
  }

  useEffect(() => {getResponse()}, []);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      
      <HeaderComponent /> 
      <NavbarComponent activeLabel='Dashboard'/> 
      {/* {users.map(user => <AppShell.Main>{user}</AppShell.Main>)} */}
      {/* <AppShell.Main>{JSON.stringify(users.message)}</AppShell.Main> */}
      <AppShell.Main>{response.message}</AppShell.Main>

    </AppShell>
  );
}
