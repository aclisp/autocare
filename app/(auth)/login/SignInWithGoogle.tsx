'use client';

import { Flex, Title } from '@mantine/core';
import { GoogleButton } from '@/components/GoogleButton/GoogleButton';
import { DIRECTUS_URL } from '@/lib/directus/constants';
import { SITE_URL } from '@/lib/constants';
import { IconCarFilled } from '@tabler/icons-react';

export function SignInWithGoogle() {
  return (
    <Flex align="center" direction="column">
      <IconCarFilled />
      <Title order={4} mt="md" mb="xl">
        Customer Sign In
      </Title>
      <GoogleButton
        radius="xl"
        href={`${DIRECTUS_URL}/auth/login/google?redirect=${SITE_URL}/login/seamless`}
      >
        Sign In with Google
      </GoogleButton>
    </Flex>
  );
}
