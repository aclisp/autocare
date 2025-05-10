import { directusAsset } from '.';
import { DIRECTUS_URL } from './constants';

test('directusAsset', () => {
  const fileId = 'abcd';
  expect(directusAsset(fileId)).toBe(`${DIRECTUS_URL}/assets/${fileId}`);
  expect(directusAsset(fileId, { quality: 10 })).toBe(
    `${DIRECTUS_URL}/assets/${fileId}?quality=10`,
  );
});
