import { useState, useEffect } from 'react';
import { createStyles, Navbar, Modal, Text, ActionIcon, Button, UnstyledButton, Tooltip, Title, rem, Avatar, Group } from '@mantine/core';
import {
  IconUsersGroup,
  IconUser,
  IconHome,
  IconChevronLeft
} from '@tabler/icons-react';
import { useSidebar } from '../hooks/useSidebar';
import { Link } from 'react-router-dom';
import where from '../helpers/where';
import first from '../helpers/first';
import { useDisclosure } from '@mantine/hooks';

interface ILink {
  icon: any;
  label: string;
  link: string;
}
interface IUser {
  name: string;
  lastname: string;
}
const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },

  aside: {
    flex: `0 0 ${rem(60)}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
  },

  main: {
    flex: 1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.green[0],
  },

  mainLink: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.green[7],
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    '&, &:hover': {
      backgroundColor: theme.colors.green[1],
      color: theme.colors.white, 
    },
  },

  title: {
    boxSizing: 'border-box',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
  },

  logo: {
    display: 'flex',
    justifyContent: 'center',
    height: rem(60),
    paddingTop: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    marginBottom: theme.spacing.xl,
  },

  togglerButton: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.green[7],
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black, 
    fontFamily: 'arial',
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 700,
    height: rem(44),

    lineHeight: rem(44),
    '&:hover': {
      color: theme.colors.green[7], 
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  },

  linkActive: {
    color: theme.colors.green[7],

    '&, &:hover': {
      backgroundColor: theme.colors.green[1],
      color: theme.colors.white,
    },
  },
}));



const mainLinksMockdata: ILink[] = [
  { icon: IconHome, label: 'Dashboard', link: '/Dashboard' },
  { icon: IconUsersGroup, label: 'Reuniones', link: '/grupos' },
];

export default function Nav() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(window.location.pathname);
  const [opened, { open, close }] = useDisclosure(false);
  const [userData, setUserData] = useState<{ name?: string; lastname?: string; email?: string }>({});

  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem('sidebarOpen') === 'true' || false
  );
  const sidebar = useSidebar();

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const parsedUserData = JSON.parse(userString);
      console.log("Datos del usuario:", parsedUserData);
      setUserData(parsedUserData);
    } else {
      console.log("No se encontraron datos del usuario en el localStorage");
    }

    localStorage.setItem('sidebarOpen', sidebarOpen.toString());
  }, [sidebarOpen]);

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position='right'
      withArrow
      onClick={() => {
        if (link.label == 'Reuniones') {
          window.location.href = "http://localhost:3000/";
        }
      }}
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <Link to={link.link} className={cx(classes.mainLink, { [classes.mainLinkActive]: active === link.link })}>
        <UnstyledButton
          onClick={() => setActive(link.link)}
          className={cx(classes.mainLink, { [classes.mainLinkActive]: active === link.link })}
        >
          <link.icon size='1.4rem' stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  ));
  const activeLink = first(where(mainLinksMockdata, (link: ILink) => link.link === window.location.pathname));

  const activeLinkLabel = activeLink ? activeLink.label : '';
  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    sidebar.setSidebar(!sidebar.active, sidebar.width === 0 ? 300 : 0);
  };
  useEffect(() => {
    const storedSidebarOpen = localStorage.getItem('sidebarOpen') === 'true';
    setSidebarOpen(storedSidebarOpen);
    sidebar.setSidebar(storedSidebarOpen, storedSidebarOpen ? 300 : 0);
  }, [sidebar, setSidebarOpen]);

  const links = mainLinksMockdata.map((link) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      to={link.link}
      onClick={() => {
        setActive(link.link);
      }}
      key={link.label}
    >
      {link.label}
    </Link>
  ));
  const handleCerrarSesion = () => {
    window.location.href = "/";
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <>
      <Modal centered opened={opened} onClose={close} withCloseButton={false} radius="lg" >
        <Group position='center'>

          <Avatar variant="outline" radius="lg" size="200px" color="teal" />
        </Group>

        <Group mt={15} position='center'>

          <Title fw={500} order={2}>{userData.name} {userData.lastname}</Title>
        </Group>

        <Group mt={15} position='center'>

          <Title fw={500} color='grey' order={4}>{userData.email}</Title>

        </Group>
        <Link to="/" style={{ textDecoration: "none" }}>
      <Button mt={15} fullWidth color="red" radius="md" onClick={handleCerrarSesion}>
        Cerrar sesión
      </Button>
    </Link>
      </Modal>


      <Navbar height='100vh' width={{ sm: sidebar.width }}>
        <Navbar.Section grow className={classes.wrapper}>
          <div className={classes.aside}>
            <div className={classes.logo}>

              <Avatar
                mt={-8}
                color='light'
                size={45}
                radius='md'

                src='/logo.png'
              >
                <IconUser size='1.4rem' stroke={1.9} />
              </Avatar>
            </div>
            {mainLinks}
            <ActionIcon onClick={open} color="green" >
              <IconUser size="1.125rem" />
            </ActionIcon>
            <Tooltip
              label={sidebar.active ? 'Cerrar panel' : 'Abrir panel'}
              position='right'
              withArrow
              transitionProps={{ duration: 0 }}
            >
              <UnstyledButton
                onClick={() => handleSidebar()}
                className={cx(classes.mainLink, { [classes.mainLinkActive]: active === active })}
                mt='auto'
              >
                <IconChevronLeft
                  size='1.4rem'
                  stroke={1.5}
                  style={{
                    transition: 'transform 350ms ease',
                    transform: sidebar.active ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </UnstyledButton>
            </Tooltip>
          </div>

          {

            sidebar.active && (
              <div className={classes.main}>
                <Title order={3} className={classes.title}>
                  {activeLinkLabel}
                </Title>
                <Text>

                  {links}
                </Text>
              </div>
            )
          }
        </Navbar.Section>
      </Navbar>
    </>
  );
}