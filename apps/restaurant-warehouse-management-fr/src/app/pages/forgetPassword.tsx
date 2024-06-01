import {
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
  } from '@mantine/core';
  import { IconArrowLeft } from '@tabler/icons-react';
  import { Link } from 'react-router-dom';
  // import classes from './ForgetPassword.module.css';
  
  export function ForgetPassword() {
    return (
      <Container size={460} my={30}>
        <Title ta="center">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your phone number to get a reset link
        </Text>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Your phone number" placeholder="09xx xxx xxxx" required />
          <Group justify="space-between" mt="lg">
            <Anchor c="dimmed" size="sm" component={Link} to='/'>
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button radius={'lg'}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    );
  }