import { useState } from 'react';
import { Group, Code, AppShell, NavLink } from '@mantine/core';
import {
  Icon2fa,
  IconBuildingWarehouse,
  IconBellRinging,
  IconPackage,
  IconMeat,
  IconSwitchHorizontal,
  IconLogout,
  IconDashboard,
} from '@tabler/icons-react';
import { Link} from 'react-router-dom';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavbarComponent.module.css';
/* eslint-disable-next-line */
export interface NavbarComponentProps {
  activeLabel: string;
}

const data = [
  { link: '/Dashboard', label: 'Dashboard', icon: IconDashboard },
  { link: '/Users', label: 'Users', icon: Icon2fa },
  { link: '/Warehouse', label: 'Warehouse', icon: IconBuildingWarehouse },
  { link: '/Restaurant', label: 'Restaurant', icon: IconBellRinging },
  { link: '/Items', label: 'Items', icon: IconPackage },
  { link: '/Foods', label: 'Foods', icon: IconMeat },
  // { link: '', label: 'Other Settings', icon: IconSettings },
];

export function NavbarComponent(props: NavbarComponentProps) {
  const [active, setActive] = useState(props.activeLabel);
  // const navigate = useNavigate();
  const links = data.map((item) => (   
    <NavLink
      component={Link}
      variant='link'
      to={item.link}
      className={classes.link}
      active={item.label === active}
      key={item.label}
      label={item.label}
      leftSection={<item.icon stroke={1.5} />}
      onClick={() => {
        setActive(item.label);
      }}
    
      
    />
  )
  );

  
  return (
    <AppShell.Navbar className={classes.navbar} p="md">
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="/"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="/"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </AppShell.Navbar>
  );
}
export default NavbarComponent;
