'use client';

import { Flex, Title } from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import Link from 'next/link';
import { DIRECTUS_URL } from '@/lib/directus/constants';
import { IconCarFilled } from '@tabler/icons-react';

const URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export function SignInWithGoogle() {
  return (
    <Flex align="center" direction="column">
      <IconCarFilled />
      <Title order={4} mt="md" mb="xl">
        Customer Sign In
      </Title>
      <GoogleButton
        radius="xl"
        component={Link}
        href={`${DIRECTUS_URL}/auth/login/google?redirect=${URL}/login/seamless`}
      >
        Sign In with Google
      </GoogleButton>
    </Flex>
  );
}
