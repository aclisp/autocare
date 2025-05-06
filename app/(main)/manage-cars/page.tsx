'use client';

import { Container, ScrollArea, Title } from '@mantine/core';
import { RequireLogin } from '@/components/RequireLogin/RequireLogin';
import { useItems } from '@/lib/directus/hooks';
import { Loading } from '@/components/Loading/Loading';

export default function ManageCars() {
  const { items, error, isLoading } = useItems('user_vehicles');
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
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </ScrollArea>
    </Container>
  );
}
