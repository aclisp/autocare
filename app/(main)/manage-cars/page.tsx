'use client';

import { Container, ScrollArea, Title } from '@mantine/core';
import { RequireLogin } from '@/components/RequireLogin/RequireLogin';
import { useUser } from '@/lib/directus/hooks';
import { Loading } from '@/components/Loading/Loading';

export default function ManageCars() {
  const { user, error, isLoading } = useUser();
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <RequireLogin error={error} hint="to manage your cars." />;
  }

  return (
    <Container>
      <Title order={4}>Manage my cars</Title>
      <ScrollArea>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </ScrollArea>
    </Container>
  );
}
