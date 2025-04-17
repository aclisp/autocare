import 'server-only';
import { createDirectus, rest, staticToken } from '@directus/sdk';
import { DIRECTUS_URL } from './constants';

export const directusClient = createDirectus(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(''));
