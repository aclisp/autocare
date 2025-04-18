import { ManageCar } from '@/components/ManageCar/ManageCar';
import { NearbyStores } from '@/components/NearbyStores/NearbyStores';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { ServicesGrid } from '@/components/ServicesGrid/ServicesGrid';
import { Container, Stack, Title } from '@mantine/core';

export default function Home() {
  return (
    <Container>
      <Stack gap="md">
        <Title order={3}>
          Maintain your car at Golden Sands — more reliable, more professional!
        </Title>
        <SearchBar />
        <ManageCar />
        <NearbyStores />
        <ServicesGrid />
      </Stack>
    </Container>
  );
}
