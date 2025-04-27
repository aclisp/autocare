import { Container } from '@mantine/core';
import { SignInWithGoogle } from './SignInWithGoogle';

export default function LoginPage() {
  return (
    <Container mt={60} size="xs">
      <SignInWithGoogle />
    </Container>
  );
}
