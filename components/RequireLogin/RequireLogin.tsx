import { directusError } from '@/lib/directus';
import { Container, Stack, Text, Group, Anchor } from '@mantine/core';
import { IconHandFingerRight } from '@tabler/icons-react';
import Link from 'next/link';

export function RequireLogin({
  error,
  hint,
}: { error: unknown; hint: string }) {
  return (
    <Container>
      <Stack gap="md">
        <Text>{directusError(error)}</Text>
        <Group gap="xs">
          <IconHandFingerRight />
          <Anchor underline="always" component={Link} href="/login">
            Login
          </Anchor>{' '}
          {hint}
        </Group>
      </Stack>
    </Container>
  );
}
