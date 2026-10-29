import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { checkDist } from '../../scripts/check-hash.mjs';

const fixture = (name) => fileURLToPath(new URL(`../fixtures/${name}`, import.meta.url));

test('a built site with index.html and hashed, resolving assets passes', async () => {
  const result = await checkDist(fixture('dist-ok'));
  assert.deepEqual(result.errors, []);
  assert.equal(result.files, 5);
  assert.equal(result.references, 4);
});

test('an asset without a content hash in its name fails', async () => {
  const result = await checkDist(fixture('dist-unhashed'));
  assert.deepEqual(result.errors, ['not hashed: assets/main.js']);
});

test('a reference to a file missing from the build fails', async () => {
  const result = await checkDist(fixture('dist-missing'));
  assert.deepEqual(result.errors, ['unresolved: /assets/gone-Mn45Bv67.glb (in assets/index-Ab3_x9Zq.js)']);
});
