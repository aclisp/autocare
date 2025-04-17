import { Container } from '@mantine/core';
import { AuthenticationForm } from './AuthenticationForm';

export default function LoginPage() {
  return (
    <Container mt={60} size="xs">
      <AuthenticationForm />
    </Container>
  );
}
