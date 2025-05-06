import useSWR from 'swr';
import { directusClient } from './client-only';
import {
  type CollectionType,
  type Query,
  type RegularCollections,
  readItems,
  readMe,
} from '@directus/sdk';
import { directusError } from '.';
import type { Schema } from './types';

export type User = Exclude<ReturnType<typeof useUser>['user'], undefined>;
export function useUser() {
  const { data, error, isLoading } = useSWR(
    '/users/me',
    async () => {
      return await directusClient.request(
        readMe({
          fields: ['first_name', 'avatar'],
        }),
      );
    },
    { shouldRetryOnError: false },
  );
  return {
    user: data,
    error: directusError(error),
    isLoading,
  };
}

export function useItems<
  Collection extends RegularCollections<Schema>,
  const TQuery extends Query<Schema, CollectionType<Schema, Collection>>,
>(key: string, collection: Collection, query?: TQuery) {
  const { data, error, isLoading } = useSWR(
    `/${key}/items/${collection}`,
    async () => {
      return await directusClient.request(readItems(collection, query));
    },
    { shouldRetryOnError: false },
  );
  return {
    items: data,
    error: directusError(error),
    isLoading,
  };
}

export type UserVehicle = Exclude<
  ReturnType<typeof useUserVehicles>['items'],
  undefined
>[number];
export function useUserVehicles() {
  const { items, error, isLoading } = useItems(
    'user_vehicles',
    'user_vehicles',
    {
      fields: [
        'id',
        'license_plate',
        'primary_image',
        'make',
        'model',
        'last_service_date',
        'mileage',
      ],
      filter: { status: { _neq: 'archived' } },
    },
  );
  return {
    items,
    error,
    isLoading,
  };
}
