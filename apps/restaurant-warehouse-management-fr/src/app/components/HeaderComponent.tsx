// import {name, phone_number} from '../pages/login';
import cx from 'clsx';
import { Autocomplete, Group, Burger, rem, Avatar, Text, Menu, UnstyledButton, useMantineTheme, AppShell } from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconChevronDown, IconHeart, IconBuildingWarehouse} from '@tabler/icons-react';
import classes from './HeaderComponent.module.css';
/* eslint-disable-next-line */
export interface HeaderComponentProps {}

// const links = [
//   { link: '/items', label: 'Warehouse Items' },
//   { link: '/foods', label: 'Foods' },
//   { link: '/restaurant', label: 'Restaurant' },
//   { link: '/reports', label: 'Reports' },
// ];

function HeaderComponent(props: HeaderComponentProps) {
  const string_user = localStorage.getItem('user')

  interface RowData {
    "personnel_code": string;
    "national_code": string;
    "first_name": string;
    "last_name": string;
    "full_name": string;
    "birth_date": string;
    "phone_number": string;
    "password": string;
    "image" : string;
    "isAdmin" : boolean;
  }

  let user: RowData = {
    "personnel_code": "",
    "national_code": "",
    "first_name": "",
    "last_name": "",
    "full_name": "",
    "birth_date": "",
    "phone_number": "",
    "password": "",
    "image": "",
    "isAdmin": false,
  };

  if (string_user) {
    user = JSON.parse(string_user)
  }
  // console.log("getItem", user)
  user.full_name = user.first_name + ' ' + user.last_name;
  user.image = 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png';
  // console.log("getItem 2", user)

  // const user = {
  //   name: JSON.parse(localStorage.getItem('user'))
  //   phone_number,
  //   image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
  // };

  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  // const items = links.map((link) => (
  //   <a
  //     key={link.label}
  //     href={link.link}
  //     className={classes.link}
  //     onClick={(event) => event.preventDefault()}
  //   >
  //     {link.label}
  //   </a>
  // ));

  return (
    <AppShell.Header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
           <IconBuildingWarehouse
                    size={48}
                    color={"#008080"}
                    stroke={1.5}
                  />
                  <Text 
                  variant='gradient'
                  gradient={{from: "#008080", to: "pink", deg:250}} visibleFrom="xs">
                    restaurant warehouse management system
                  </Text>
        </Group>

        {/* <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="md">
            {items}
          </Group> */}
          {/* <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(26), height: rem(16) }} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="lg"
          /> */}
        {/* </Group> */}
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
          <Group gap={7}>
            <Avatar src={user.image} alt={user.full_name} radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.full_name}
            </Text>
            {/* <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} /> */}
            </Group>
            </UnstyledButton>
            </Menu.Target>
            {/* <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
            </Menu.Dropdown> */}
          </Menu>
      </div>
    </AppShell.Header>
  );
}

export default HeaderComponent;
