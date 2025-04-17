import 'client-only';
import { authentication, createDirectus, rest } from '@directus/sdk';
import { DIRECTUS_URL } from './constants';

export const directusClient = createDirectus(DIRECTUS_URL)
  .with(rest({ credentials: 'include' }))
  .with(authentication('session', { credentials: 'include' }));
