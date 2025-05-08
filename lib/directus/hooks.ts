import useSWR from 'swr';
import { directusClient } from './client-only';
import {
  type CollectionType,
  type Query,
  type RegularCollections,
  readItem,
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
          fields: ['id', 'first_name', 'avatar'],
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
>(key: string | null, collection: Collection, query?: TQuery) {
  const { data, error, isLoading } = useSWR(
    key === null ? null : `/${key}/items/${collection}`, // conditionally fetch
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

export function useItem<
  Collection extends RegularCollections<Schema>,
  const TQuery extends Query<Schema, CollectionType<Schema, Collection>>,
>(key: string | number, collection: Collection, query?: TQuery) {
  const { data, error, isLoading } = useSWR(
    `/items/${collection}/${key}`,
    async () => {
      return await directusClient.request(readItem(collection, key, query));
    },
    { shouldRetryOnError: false },
  );
  return {
    item: data,
    error: directusError(error),
    isLoading,
  };
}

export type UserVehicle = Exclude<
  ReturnType<typeof useUserVehicles>['items'],
  undefined
>[number];
export function useUserVehicles() {
  const { user } = useUser();
  const { items, error, isLoading } = useItems(
    user ? 'list' : null,
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
      filter: {
        _and: [
          { status: { _neq: 'archived' } },
          { owners: { user: { _eq: user?.id || 'undefined' } } },
        ],
      },
    },
  );
  return {
    items,
    error,
    isLoading,
  };
}

export type UserVehicle2 = Exclude<
  ReturnType<typeof useUserVehicle>['item'],
  undefined
>;
export function useUserVehicle(id: string) {
  const { item, error, isLoading } = useItem(id, 'user_vehicles', {
    fields: ['*', { owners: ['id', 'user'] }],
  });
  return {
    item,
    error,
    isLoading,
  };
}
