import { cp } from 'node:fs';

const src_dir = './packages/elements/dist/__StandardElements__';
const dest_dir = './packages/runtime/dist/static/__StandardElements__';

cp(src_dir, dest_dir, { recursive: true }, (err) => {
  if (err) {
    throw new Error('copy elements to runtime error', err);
  }
});
