'use client';

import {
  Card,
  Container,
  Title,
  Text,
  AspectRatio,
  Image,
  SimpleGrid,
  Group,
  ActionIcon,
} from '@mantine/core';
import { RequireLogin } from '@/components/RequireLogin/RequireLogin';
import { type UserVehicle, useUserVehicles } from '@/lib/directus/hooks';
import { Loading } from '@/components/Loading/Loading';
import classes from './page.module.css';
import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';
import { directusAsset } from '@/lib/directus';

export default function ManageCars() {
  const { items, error, isLoading } = useUserVehicles();
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <RequireLogin error={error} hint="to manage your cars." />;
  }

  return (
    <Container>
      <Title order={4}>Manage my cars</Title>
      <Group justify="end" mx="xl">
        <ActionIcon
          size={44}
          variant="filled"
          radius="xl"
          component={Link}
          href="/manage-cars/create"
        >
          <IconPlus />
        </ActionIcon>
      </Group>
      <CarsCardsGrid items={items} />
    </Container>
  );
}

function CarsCardsGrid({ items }: { items?: UserVehicle[] }) {
  const cards = items?.map((item) => {
    let title = `${item.model ?? ''}`;
    if (item.make) {
      title = `${item.make} ${title}`;
    }
    return (
      <Card
        key={item.id}
        p="md"
        radius="md"
        component={Link}
        href={`/manage-cars/${item.id}`}
        className={classes.card}
      >
        <AspectRatio ratio={1920 / 1080}>
          <Image src={directusAsset(item.primary_image)} radius="md" />
        </AspectRatio>
        <Text className={classes.date}>{item.license_plate}</Text>
        <Text className={classes.title}>{title}</Text>
      </Card>
    );
  });

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 0, sm: 'md' }}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
