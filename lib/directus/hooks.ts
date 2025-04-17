import useSWR from 'swr';
import { directusClient } from './client-only';
import { readMe } from '@directus/sdk';
import { directusError } from '.';
import type { User } from './types';

export function useUser() {
  const { data, error, isLoading } = useSWR<User>('/users/me', async () => {
    const response = await directusClient.request<User>(readMe());
    return response;
  });
  return {
    user: data,
    error: directusError(error),
    isLoading,
  };
}
