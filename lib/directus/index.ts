import { isDirectusError } from '@directus/sdk';
import { DIRECTUS_URL } from './constants';

export function directusError(e: unknown): string | undefined {
  if (e === null || e === undefined) {
    return undefined;
  }
  if (typeof e === 'string') {
    return e;
  }
  if (isDirectusError(e)) {
    return e.errors.map((e) => e.message).join(' ');
  }
  if (isError(e)) {
    return `${e.name} ${e.message}`;
  }
  return JSON.stringify(e);
}

function isError(value: unknown): value is Error {
  const isError =
    typeof value === 'object' &&
    value !== null &&
    Array.isArray(value) === false &&
    'name' in value &&
    'message' in value;

  return isError;
}

export function directusAsset(fileId: string) {
  return `${DIRECTUS_URL}/assets/${fileId}`;
}
