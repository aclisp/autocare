//import { directusError } from '@/lib/directus';
import { Center, Container, Stack, Text, Title } from '@mantine/core';
import { GoogleButton } from '@/components/GoogleButton/GoogleButton';
import { DIRECTUS_URL } from '@/lib/directus/constants';
import { SITE_URL } from '@/lib/constants';

export function RequireLogin({
  /*error,*/
  hint,
}: { error: unknown; hint: string }) {
  return (
    <Container>
      <Stack align="center" gap={0}>
        <Center h={24}>
          <Text size="xs">{/*directusError(error)*/}</Text>
        </Center>
        <Title order={4} mt="md" mb="xl">{`Login ${hint}`}</Title>
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
