import { useState, useEffect } from 'react';
import { AppShell, NavLink, Loader } from '@mantine/core';
import {
  Icon2fa,
  IconBuildingWarehouse,
  IconBellRinging,
  IconPackage,
  IconMeat,
  IconSwitchHorizontal,
  IconLogout,
  IconDashboard,
  IconChartArcs,
} from '@tabler/icons-react';
import { Link} from 'react-router-dom';
import axios from "axios"
import { notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import classes from './NavbarComponent.module.css';
/* eslint-disable-next-line */
export interface NavbarComponentProps {
  activeLabel: string;
}

interface Warehouse {
  id: number;
  name: string;
}

interface Restaurant {
  id: number;
  name: string;
}
// const data = [
//   { link: '/Dashboard', label: 'Dashboard', icon: IconDashboard },
//   { link: '/Users', label: 'Users', icon: Icon2fa },
//   { link: '/Warehouse', label: 'Warehouse', icon: IconBuildingWarehouse },
//   { link: '/Restaurant', label: 'Restaurant', icon: IconBellRinging },
//   { link: '/Items', label: 'Items', icon: IconPackage },
//   { link: '/Foods', label: 'Foods', icon: IconMeat },
//   // { link: '', label: 'Other Settings', icon: IconSettings },
// ];

export function NavbarComponent(props: NavbarComponentProps) {
  const [active, setActive] = useState(props.activeLabel);
  const [data, setData] = useState([{ link: '/Dashboard', label: 'Dashboard', icon: IconDashboard}]);
  const [loading, setLoading] = useState<boolean>(true);
  // const navigate = useNavigate();
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
    "isAdmin": boolean;
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
  const setAdminPermission = () => {
    setData([
      { link: '/Dashboard', label: 'Dashboard', icon: IconDashboard },
      // { link: '/Users', label: 'Users', icon: Icon2fa },
      { link: '/Warehouse', label: 'Warehouse', icon: IconBuildingWarehouse },
      { link: '/Restaurant', label: 'Restaurant', icon: IconBellRinging },
      { link: '/Items', label: 'Items', icon: IconPackage },
      { link: '/Foods', label: 'Foods', icon: IconMeat },
      { link: '/Report', label: 'Report', icon: IconChartArcs },
    ])
  }
  const setWarehouseManagerPermission = (warehouse: Warehouse[]) => {
    console.log("We are in setWarehouseManagerPermission function")
    setData([
      { link: '/Dashboard', label: 'Dashboard', icon: IconDashboard },
      { link: '/Warehouse', label: 'Warehouse', icon: IconBuildingWarehouse },
      { link: '/Items', label: 'Items', icon: IconPackage },
      // { link: '', label: 'Other Settings', icon: IconSettings },
    ])

    localStorage.setItem('warehouse', JSON.stringify({id: warehouse[0].id, name: warehouse[0].name}));
    console.log("warehouse", JSON.stringify({id: warehouse[0].id, name: warehouse[0].name}))
  }
  const setRestaurantManagerPermission = (restaurant: Restaurant[]) => {
    console.log("We are in setRestaurantManagerPermission function")
    setData([
      { link: '/Dashboard', label: 'Dashboard', icon: IconDashboard },
      { link: '/Restaurant', label: 'Restaurant', icon: IconBellRinging },
      { link: '/Foods', label: 'Foods', icon: IconMeat },
      { link: '/Report', label: 'Report', icon: IconChartArcs },
      // { link: '', label: 'Other Settings', icon: IconSettings },
    ]) 
    localStorage.setItem('restaurant', JSON.stringify({id: restaurant[0].id, name: restaurant[0].name}));
  }
  const getPermission = () => {
    setLoading(true);
    console.log("user in get permission: ", user) 
    user.isAdmin ? setAdminPermission() : 
      axios.get(`http://localhost:3333/warehouses/manager/${user.personnel_code}`)
        .then(res =>{
          console.log("get warehouse permission: ", res.data)
          res.data.length > 0 ? setWarehouseManagerPermission(res.data) :  axios.get(`http://localhost:3333/restaurants/manager/${user.personnel_code}`)
        .then(res =>{
          console.log("get restaurant permission: ", res.data)
          res.data.length > 0 ? setRestaurantManagerPermission(res.data) :  notifications.show({
            withBorder: true,
            title: "Guest useres don't have permission to access site services!",
            message: '', 
            color: 'yellow',
            position: 'bottom-left',
            style: {borderColor: 'red', width: '30rem' },
          });
        }) 
        .catch(error => {
          setLoading(false);
          notifications.show({
            withBorder: true,
            title: 'Failed to get user permission (restaurant)!',
            message: JSON.stringify(error.response?.data), 
            color: 'red',
            position: 'bottom-left',
            style: {borderColor: 'red', width: '30rem' },
          });
        })
          // setLoading(false);
          // getData();
        })
        .catch(error => {
          setLoading(false);
          notifications.show({
            withBorder: true,
            title: 'Failed to get user permission (warehouse)!',
            message: JSON.stringify(error.response?.data), 
            color: 'red',
            position: 'bottom-left',
            style: {borderColor: 'red', width: '30rem' },
          });
        })
      setLoading(false)
   
  }
  
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

  useEffect(() => {getPermission()}, []);
  if(loading){
      console.log("loading")
      return <Loader type="dots" color="grape" />;
  }
  return (
    <AppShell.Navbar className={classes.navbar} p="md" >
      <div className={classes.navbarMain} style={{ paddingTop: '50px' }}>
        {/* <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} />
          <Code fw={700}>v3.1.2</Code>
        </Group> */}
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
