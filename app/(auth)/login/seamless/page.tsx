'use client';

import { Loading } from '@/components/Loading/Loading';
import { directusClient } from '@/lib/directus/client-only';
import { Container, Alert, Button, Flex } from '@mantine/core';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { directusError } from '@/lib/directus';
import { IconInfoCircle } from '@tabler/icons-react';

export default function SeamlessLogin() {
  const router = useRouter();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      directusClient
        .refresh()
        .then(() => {
          router.push('/');
        })
        .catch((error) => {
          setError(directusError(error));
        });
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <Container mt={60} size="xs">
      {error ? <SeamlessLoginError error={error} /> : <Loading />}
    </Container>
  );
}

function SeamlessLoginError({ error }: { error: string }) {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="red" title="Login failed" icon={icon}>
      {error}
      <Flex justify="end" mt="md">
        <Button variant="default" radius="xl" component={Link} href="/login">
          Try Again
        </Button>
      </Flex>
    </Alert>
  );
}
