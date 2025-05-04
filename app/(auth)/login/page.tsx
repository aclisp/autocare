import { Container } from '@mantine/core';
import { SignInWithGoogle } from './SignInWithGoogle';

export default function LoginPage() {
  return (
    <Container mt={76} size="xs">
      <SignInWithGoogle />
    </Container>
  );
}
