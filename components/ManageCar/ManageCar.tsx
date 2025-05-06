'use client';

import { type UserVehicle, useUserVehicles } from '@/lib/directus/hooks';
import { Card, Image, Group, Text, Badge, Button } from '@mantine/core';
import Link from 'next/link';
import { Loading } from '../Loading/Loading';
import { DIRECTUS_URL } from '@/lib/directus/constants';

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
      <Button
        component={Link}
        fullWidth
        mt="md"
        radius="md"
        href="/manage-cars"
      >
        {!items || items.length === 0 ? 'Add My Car' : 'Manage My Cars'}
      </Button>
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
      </>
    );
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  const item = items[randomIndex];
  const image = `${DIRECTUS_URL}/assets/${item.primary_image}`;
  let title = `${item.model ?? ''}`;
  if (item.make) {
    title = `${item.make} ${title}`;
  }
  return (
    <>
      <Card.Section>
        <Image src={image} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="pink">{item.license_plate}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Driven {item.mileage ?? '---'} km, last serviced on{' '}
        {item.last_service_date ?? '---'}.
      </Text>
    </>
  );
}
