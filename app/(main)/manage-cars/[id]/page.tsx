'use client';

import { use } from 'react';
import { Container } from '@mantine/core';
import { VehicleFormEdit } from '@/components/VehicleForm/VehicleForm';

export default function EditCar({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <Container>
      <VehicleFormEdit id={id} />
    </Container>
  );
}
