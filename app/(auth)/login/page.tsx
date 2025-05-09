import { Container, Divider } from '@mantine/core';
import { SignInWithGoogle } from './SignInWithGoogle';
import { AuthenticationForm } from './AuthenticationForm';

export default function LoginPage() {
  return (
    <Container mt={76} size="xs">
      <SignInWithGoogle />
      <Divider label="Or continue with email" labelPosition="center" my="xl" />
      <AuthenticationForm />
    </Container>
  );
}
