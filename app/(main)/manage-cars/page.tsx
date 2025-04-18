import { Container, ScrollArea, Title } from '@mantine/core';
import { cookies } from 'next/headers';
import { directusClient } from '@/lib/directus/server-only';
import { readMe } from '@directus/sdk';
import { RequireLogin } from '@/components/RequireLogin/RequireLogin';

export default async function ManageCars() {
  let response: Record<string, any>;
  try {
    const token = (await cookies()).get('directus_session_token')?.value;
    directusClient.setToken(token ?? '');
    response = await directusClient.request(readMe());
  } catch (error) {
    return <RequireLogin error={error} hint="to manage your cars." />;
  }

  return (
    <Container>
      <Title order={3}>Manage my cars</Title>
      <ScrollArea>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </ScrollArea>
    </Container>
  );
}
