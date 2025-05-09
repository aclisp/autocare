import { RequireLogin } from '@/components/RequireLogin/RequireLogin';
import { Center, Container, Stack, Text } from '@mantine/core';

export function ErrorHandler({ error, hint }: { error: string; hint: string }) {
  if (error === 'FORBIDDEN') {
    return (
      <Container>
        <Stack align="center" gap={0}>
          <Center h={24}>
            <Text size="xs">{error}</Text>
          </Center>
          <Center h={100}>404</Center>
        </Stack>
      </Container>
    );
  }

  return <RequireLogin error={error} hint={hint} />;
}
