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
import { Link, useNavigate } from 'react-router-dom';
// import { setActive } from '../components/NavbarComponent'

// interface RowData {
//   name: string;
//   price: string;
// }

export function Login() {
  const navigate = useNavigate();

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
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
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
            navigate('/Restaurant')
            // setActive('/Restaurant')
          }}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
    // </Router>
  );
}
