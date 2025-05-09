import { Loading } from '@/components/Loading/Loading';
import { directusAsset } from '@/lib/directus';
import {
  type User,
  type UserVehicle2,
  useUser,
  useUserVehicle,
} from '@/lib/directus/hooks';
import {
  ActionIcon,
  Container,
  Group,
  SimpleGrid,
  TextInput,
  Title,
  Image,
  Stack,
  ColorInput,
  NumberInput,
  Text,
  AspectRatio,
} from '@mantine/core';
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  type FileWithPath,
} from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import classes from './VehicleForm.module.css';
import { DatePickerInput, YearPickerInput } from '@mantine/dates';
import { directusClient } from '@/lib/directus/client-only';
import { createItem, deleteItem, updateItem, uploadFiles } from '@directus/sdk';
import { format, parse } from '@/lib/form';
import { useRouter } from 'next/navigation';
import { modals } from '@mantine/modals';
import type { VehicleOwner } from '@/lib/directus/types';
import { useEffect, useState } from 'react';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';

export function VehicleFormNew() {
  const { user, error, isLoading } = useUser();
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorHandler error={error} hint="to add your cars." />;
  }

  return (
    <>
      <Title order={4} mb="xl">
        Add a car
      </Title>
      <VehicleForm user={user} />
    </>
  );
}

export function VehicleFormEdit({ id }: { id: string }) {
  const { item, error, isLoading } = useUserVehicle(id);
  const { user } = useUser();
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorHandler error={error} hint="to edit your cars." />;
  }

  return (
    <>
      <Title order={4} mb="xl">
        Edit car info
      </Title>
      <VehicleForm user={user} item={item} />
    </>
  );
}

function VehicleForm({ item, user }: { item?: UserVehicle2; user?: User }) {
  const router = useRouter();

  const initializeValues = (item?: UserVehicle2) => ({
    ...item,
    color: item?.color || '',
    year: parse(item?.year),
    last_service_date: parse(item?.last_service_date),
    next_service_due_date: parse(item?.next_service_due_date),
    registration_date: parse(item?.registration_date),
    date_created: parse(item?.date_created),
    date_updated: parse(item?.date_updated),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initializeValues(item),
    transformValues: (values) => ({
      ...values,
      license_plate: values.license_plate?.trim(),
      make: values.make?.trim(),
      model: values.model?.trim(),
      vin: values.vin?.trim(),
      year: format(values.year, 'YYYY'),
      last_service_date: format(values.last_service_date, 'YYYY-MM-DD'),
      next_service_due_date: format(values.next_service_due_date, 'YYYY-MM-DD'),
      registration_date: format(values.registration_date, 'YYYY-MM-DD'),
      date_created: format(values.date_created),
      date_updated: format(values.date_updated),
    }),
    validate: {
      primary_image: (value) => (value ? null : 'Need a vehicle image'),
      license_plate: (value) => (value ? null : 'Need the license plate'),
    },
  });

  useEffect(() => {
    const values = initializeValues(item);
    form.setInitialValues(values);
    form.setValues(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const primaryImage = form.getValues().primary_image;

  const handleSubmit = form.onSubmit(async (values) => {
    if (!user) {
      throw new Error('Can not submit vehicle data without user');
    }
    if (values.id) {
      if (
        (values.owners as VehicleOwner[]).some(
          (owner) => owner.user === user.id,
        )
      ) {
        await directusClient.request(
          updateItem('user_vehicles', values.id, values),
        );
      } else {
        await directusClient.request(
          updateItem('user_vehicles', values.id, {
            ...values,
            owners: [...(values.owners as VehicleOwner[]), { user: user.id }],
          }),
        );
      }
    } else {
      await directusClient.request(
        createItem('user_vehicles', {
          ...values,
          owners: [{ user: user.id }] as VehicleOwner[],
        }),
      );
    }
    router.push('/manage-cars');
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (files: FileWithPath[]) => {
    const formData = new FormData();
    formData.append(
      'folder',
      '9870ada8-9da3-41bd-9a1b-2adf44620697' /* It's the `Staff` folder */,
    );
    formData.append('file', files[0]);
    setUploading(true);
    const result = await directusClient.request(uploadFiles(formData));
    setUploading(false);
    form.setFieldValue('primary_image', result.id);
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      withCloseButton: false,
      centered: true,
      children: (
        <Text size="sm" fw={600}>
          This action is permanent and can not be undone. Are you sure you would
          like to proceed?
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        if (item?.id) {
          await directusClient.request(deleteItem('user_vehicles', item.id));
          router.push('/manage-cars');
        }
      },
    });

  return (
    <Container mx="lg">
      <form onSubmit={handleSubmit}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          <Stack gap={0}>
            <TextInput
              size="md"
              withAsterisk
              label="Image"
              description="Automatic license plate recognition by uploading your vehicle's image"
              key={form.key('primary_image')}
              classNames={{
                input: classes.hidden,
              }}
              {...form.getInputProps('primary_image')}
            />
            <Dropzone
              loading={uploading}
              onDrop={handleImageUpload}
              multiple={false}
              maxSize={3 * 1024 * 1024}
              accept={IMAGE_MIME_TYPE}
            >
              {primaryImage && (
                <AspectRatio ratio={1920 / 1080}>
                  <Image src={directusAsset(primaryImage)} radius="sm" />
                </AspectRatio>
              )}
            </Dropzone>
          </Stack>

          <TextInput
            size="md"
            withAsterisk
            label="License Plate"
            description="The vehicle registration plate is required"
            key={form.key('license_plate')}
            {...form.getInputProps('license_plate')}
          />
          <TextInput
            size="md"
            label="Make"
            description="The manufacturer or company that makes the vehicle"
            key={form.key('make')}
            {...form.getInputProps('make')}
          />
          <TextInput
            size="md"
            label="Model"
            description="The specific version or design of the vehicle"
            key={form.key('model')}
            {...form.getInputProps('model')}
          />
          <NumberInput
            size="md"
            label="Mileage"
            description="The total number of kilometers a vehicle has been driven"
            suffix=" km"
            allowNegative={false}
            allowDecimal={false}
            thousandSeparator=" "
            step={5000}
            key={form.key('mileage')}
            {...form.getInputProps('mileage')}
          />
          <TextInput
            size="md"
            label="VIN"
            description="The vehicle identification number"
            key={form.key('vin')}
            {...form.getInputProps('vin')}
          />
          <YearPickerInput
            size="md"
            label="Year"
            description="Vehicle production year"
            key={form.key('year')}
            {...form.getInputProps('year')}
          />
          <ColorInput
            size="md"
            label="Color"
            description="Vehicle color"
            key={form.key('color')}
            {...form.getInputProps('color')}
          />
          <DatePickerInput
            size="md"
            label="Last Service Date"
            description="When it was serviced and maintained"
            key={form.key('last_service_date')}
            {...form.getInputProps('last_service_date')}
          />
        </SimpleGrid>
        <Group justify="center" gap="xl" mx="xl" mt={64}>
          {item && (
            <ActionIcon
              size={44}
              variant="light"
              radius="xl"
              color="red"
              onClick={openDeleteModal}
            >
              <IconTrash />
            </ActionIcon>
          )}
          <ActionIcon
            type="submit"
            disabled={!form.isDirty()}
            loading={form.submitting}
            size={44}
            variant="filled"
            radius="xl"
          >
            <IconCheck />
          </ActionIcon>
        </Group>
      </form>
    </Container>
  );
}
