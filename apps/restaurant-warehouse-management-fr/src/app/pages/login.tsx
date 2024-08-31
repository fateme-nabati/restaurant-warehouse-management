import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import axios from "axios"
import {AxiosError } from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { request } from "http";
// import { setActive } from '../components/NavbarComponent'
// import AsyncStorage from '@react-native-community/async-storage';

interface RowData {
  username: string;
  password: string;
}

// export let name: string;
// export let phone_number: string;
export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (values: RowData) => {
    // console.log("axios getUsers");
    axios.post('http://localhost:3333/users/login', values)
        .then(res => {
          console.log(values);
          console.log("successful login", res.data)
          // localStorage.setItem('userToken', res.data.sessionID)
          // console.log("token: ", JSON.stringify(res.data.cookie))
          // console.log("token: ", res.headers.cookie)
          // console.log("token: ", res.headers.SessionID)
          // console.log("token: ", res.data.SessionID)
          localStorage.setItem('user', JSON.stringify(res.data));
          // name = res.data.first_name + ' ' + res.data.last_name;
          // phone_number = res.data.phone_number;
          navigate('Dashboard');
           
            
        })
        .catch((error: AxiosError) => {
          console.log(values);
          console.log(error); 
          notifications.show({
            withBorder: true,
            title: 'Login failed',
            message: JSON.stringify(error.response?.data), 
            color: 'red',
            position: 'bottom-left',
            // icon: <IconAlertTriangle />,
            style: {borderColor: 'red', width: '30rem' },
        });
          
    })
  }

  // useEffect(() => {getResponse()}, []);

  return (
    // <Router>
    <Container size={420} my={40}>
      <Title ta="center">
        Welcome to university restaurant warehouse management system!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Username"
          placeholder="Your personnel code"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"          
          value={password}
          onChange={(e) => setPassword(e.target.value)}

          required
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor
            component={Link}
            variant="link"
            to="/ForgetPassword"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          radius="lg"
          color="teal"
          onClick={() => {
            handleLogin({"username": username,"password": password})
          }}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
    // </Router>
  );
}
