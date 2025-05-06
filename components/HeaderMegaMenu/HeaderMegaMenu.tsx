'use client';

import {
  IconBook,
  IconBuildingStore,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconFolderStar,
  IconLogout,
  IconNotification,
  IconPlayerPause,
  IconSettings,
  IconShoppingCart,
  IconSwitchHorizontal,
  IconTrash,
  IconUserCircle,
} from '@tabler/icons-react';
import {
  Anchor,
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  Menu,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AutocareLogo } from '@/components/AutocareLogo/AutocareLogo';
import classes from './HeaderMegaMenu.module.css';
import Link from 'next/link';
import cx from 'clsx';
import { useState } from 'react';
import { useCurrentUser, type User } from '@/lib/directus/hooks';
import { DIRECTUS_URL } from '@/lib/directus/constants';
import { directusClient } from '@/lib/directus/client-only';
import { usePathname, useRouter } from 'next/navigation';

const mockdata = [
  {
    icon: IconCode,
    title: 'MAINTAIN 保养',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'CAR BEAUTY 洗车美容',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'LOCATION 四轮定位',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'WAX 打蜡',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'CLEANING INLET 清洗进气道',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={16}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Anchor component={Link} href="/">
            <AutocareLogo color="dark" size={30} />
          </Anchor>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Stores
            </a>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Services
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Services</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className={classes.link}>
              Cart
            </a>
            <a href="#" className={classes.link}>
              My
            </a>
          </Group>

          <Group visibleFrom="sm">
            <AuthInfo />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            <Group gap="xs">
              <IconBuildingStore />
              Stores
            </Group>
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                <Group gap="xs">
                  <IconFolderStar />
                  Services
                </Group>
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            <Group gap="xs">
              <IconShoppingCart />
              Cart
            </Group>
          </a>
          <a href="#" className={classes.link}>
            <Group gap="xs">
              <IconUserCircle />
              My
            </Group>
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <AuthInfo />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

function LoginButtons() {
  return (
    <>
      <Button variant="default" component={Link} href="/login">
        Log in
      </Button>
      {/* <Button>Sign up</Button> */}
    </>
  );
}

function AuthenticatedUser({
  user,
  handleLogout,
}: {
  user: User;
  handleLogout: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const userImage = `${DIRECTUS_URL}/assets/${user.avatar}`;

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal={false}
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group gap={7}>
            <Avatar
              src={userImage}
              alt={user.first_name ?? ''}
              radius="xl"
              size={30}
            />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.first_name}
            </Text>
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {/* <Menu.Item
          leftSection={
            <IconHeart size={16} color={theme.colors.red[6]} stroke={1.5} />
          }
        >
          Liked posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconStar size={16} color={theme.colors.yellow[6]} stroke={1.5} />
          }
        >
          Saved posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessage size={16} color={theme.colors.blue[6]} stroke={1.5} />
          }
        >
          Your comments
        </Menu.Item> */}

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
          Account settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}
        >
          Change account
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout size={16} stroke={1.5} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<IconPlayerPause size={16} stroke={1.5} />}>
          Pause subscription
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={16} stroke={1.5} />}
        >
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function AuthInfo() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, error, isLoading } = useCurrentUser();
  const [isLogout, setIsLogout] = useState(false);
  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await directusClient.logout();
    setIsLogout(true);
    if (pathname !== '/') {
      router.push('/');
    }
  };

  if (isLoading) {
    return <></>;
  }

  if (error || isLogout) {
    return <LoginButtons />;
  }

  if (user) {
    return <AuthenticatedUser user={user} handleLogout={handleLogout} />;
  }

  return <></>;
}
