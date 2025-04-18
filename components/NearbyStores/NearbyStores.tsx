'use client';

import { Card, Group, Image, RingProgress, Text } from '@mantine/core';
import classes from './NearbyStores.module.css';

const stats = [
  { title: 'Distance', value: '27.4 km' },
  { title: 'Avg. speed', value: '9.6 km/h' },
  { title: 'Score', value: '88/100' },
];

export function NearbyStores() {
  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src="https://dancingcat.top/assets/337d1e67-34b7-4fda-8feb-6e3facd69fac"
          alt="Nearby Stores"
          height={100}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="sm" fw={700} className={classes.title}>
          Nearby Stores
        </Text>
        <Group gap={5}>
          <Text fz="xs" c="dimmed">
            80% completed
          </Text>
          <RingProgress
            size={18}
            thickness={2}
            sections={[{ value: 80, color: 'blue' }]}
          />
        </Group>
      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        56 km this month • 17% improvement compared to last month • 443 place in
        global scoreboard
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
}
