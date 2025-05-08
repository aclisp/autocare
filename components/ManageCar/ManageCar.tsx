'use client';

import { type UserVehicle, useUserVehicles } from '@/lib/directus/hooks';
import { Card, Image, Group, Text, Badge, Button } from '@mantine/core';
import Link from 'next/link';
import { Loading } from '../Loading/Loading';
import { directusAsset } from '@/lib/directus';

export function ManageCar() {
  const { items, /*error,*/ isLoading } = useUserVehicles();
  if (isLoading) {
    return <Loading />;
  }
  // if (error) {
  //   return <></>;
  // }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Car items={items} />
    </Card>
  );
}

function Car({ items }: { items?: UserVehicle[] }) {
  if (!items || items.length === 0) {
    return (
      <>
        <Text size="sm" c="dimmed">
          We accurately recommend products based on your vehicle information.
        </Text>

        <Button
          component={Link}
          fullWidth
          mt="md"
          radius="md"
          href="/manage-cars/create"
        >
          Add My Car
        </Button>
      </>
    );
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  const item = items[randomIndex];
  let title = `${item.model ?? ''}`;
  if (item.make) {
    title = `${item.make} ${title}`;
  }
  return (
    <>
      <Card.Section>
        <Image
          src={directusAsset(item.primary_image)}
          h={{ base: 160, sm: 250 }}
          alt="My Car"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="pink">{item.license_plate}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Driven {item.mileage ?? '---'} km, last serviced on{' '}
        {item.last_service_date ?? '---'}.
      </Text>

      <Button
        component={Link}
        fullWidth
        mt="md"
        radius="md"
        href="/manage-cars"
      >
        Manage My Cars
      </Button>
    </>
  );
}
