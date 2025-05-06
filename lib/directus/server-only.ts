import 'server-only';
import { createDirectus, rest, staticToken } from '@directus/sdk';
import { DIRECTUS_URL, SERVICE_ACCOUNT_TOKEN } from './constants';
import type { Schema } from './types';

export const directusClient = createDirectus<Schema>(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(SERVICE_ACCOUNT_TOKEN));
