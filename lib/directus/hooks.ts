import useSWR from 'swr';
import { directusClient } from './client-only';
import {
  type CollectionType,
  type DirectusUser,
  type Query,
  type RegularCollections,
  readItems,
  readMe,
} from '@directus/sdk';
import { directusError } from '.';
import type { Schema } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useCurrentUserType = () => useCurrentUser();
export type User = Exclude<
  ReturnType<typeof useCurrentUserType>['user'],
  undefined
>;
export function useCurrentUser<
  const TQuery extends Query<Schema, DirectusUser<Schema>>,
>(query?: TQuery) {
  const { data, error, isLoading } = useSWR(
    '/users/me',
    async () => {
      return await directusClient.request(readMe(query));
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
>(collection: Collection, query?: TQuery) {
  const { data, error, isLoading } = useSWR(
    `/items/${collection}`,
    async () => {
      return await directusClient.request(readItems(collection, query));
    },
  );
  return {
    items: data,
    error: directusError(error),
    isLoading,
  };
}
