import 'client-only';
import { authentication, createDirectus, rest } from '@directus/sdk';
import { DIRECTUS_URL } from './constants';
import type { Schema } from './types';

export const directusClient = createDirectus<Schema>(DIRECTUS_URL)
  .with(rest({ credentials: 'include' }))
  .with(authentication('session', { credentials: 'include' }));
