'use client';

import { Center } from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { signIn } from 'next-auth/react';

export function SignInWithGoogle() {
  return (
    <Center>
      <GoogleButton radius="xl" onClick={() => signIn('google')}>
        Google
      </GoogleButton>
    </Center>
  );
}
