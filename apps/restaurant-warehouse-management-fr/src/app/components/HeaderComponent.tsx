import cx from 'clsx';
import { Autocomplete, Group, Burger, rem, Avatar, Text, Menu, UnstyledButton, useMantineTheme, AppShell } from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconChevronDown, IconHeart, IconBuildingWarehouse} from '@tabler/icons-react';
import classes from './HeaderComponent.module.css';
/* eslint-disable-next-line */
export interface HeaderComponentProps {}

const user = {
  name: 'Ali Alavi',
  email: 'ali.alavi@gmail.com',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
};

const links = [
  { link: '/dashboard', label: 'Dashboard' },
  { link: '/items', label: 'Warehouse Items' },
  { link: '/foods', label: 'Foods' },
  { link: '/reports', label: 'Reports' },
];

function HeaderComponent(props: HeaderComponentProps) {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <AppShell.Header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
           <IconBuildingWarehouse
                    size={48}
                    color={"#33d17a"}
                    stroke={1.5}
                  />
                  <Text color={"#33d17a"} visibleFrom="xs">restaurant warehouse management</Text>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="md">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="lg"
          />
        </Group>
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
            <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.name}
            </Text>
            <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </Group>
            </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
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
            </Menu.Dropdown>
          </Menu>
      </div>
    </AppShell.Header>
  );
}

export default HeaderComponent;
