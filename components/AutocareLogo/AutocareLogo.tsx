import { Group, Text } from '@mantine/core';
import { IconCarGarage } from '@tabler/icons-react';

export function AutocareLogo({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  color,
  size,
}: { color?: string; size?: number }) {
  return (
    <Group gap="xs">
      <IconCarGarage size={size} />
      <Text fw={700}>AUTO CARE</Text>
    </Group>
  );
}
