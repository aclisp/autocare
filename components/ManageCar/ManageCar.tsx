'use client';

import { Card, Image, Group, Text, Badge, Button } from '@mantine/core';
import Link from 'next/link';

export function ManageCar() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://i.imgur.com/ZL52Q2D.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Tesla Model S</Text>
        <Badge color="pink">粤X00001</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text>

      <Button
        component={Link}
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        href="/manage-cars"
      >
        Manage My Cars
      </Button>
    </Card>
  );
}
