import { directusError } from '@/lib/directus';
import { Container, Stack, Text } from '@mantine/core';
import { GoogleButton } from '@/components/GoogleButton/GoogleButton';
import { DIRECTUS_URL } from '@/lib/directus/constants';
import { SITE_URL } from '@/lib/constants';

export function RequireLogin({
  error,
  hint,
}: { error: unknown; hint: string }) {
  return (
    <Container>
      <Stack align="center" gap="md">
        <Text size="xs">{directusError(error)}</Text>
        <Text mt="md" mb="xl">{`Login ${hint}`}</Text>
        <GoogleButton
          radius="xl"
          href={`${DIRECTUS_URL}/auth/login/google?redirect=${SITE_URL}/login/seamless`}
        >
          Sign In with Google
        </GoogleButton>
      </Stack>
    </Container>
  );
}
