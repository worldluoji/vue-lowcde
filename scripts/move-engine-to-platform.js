import { cp } from 'node:fs';

const src_dir = './packages/runtime/dist';
const dest_dir = './packages/platform/dist/static/engine';

cp(src_dir, dest_dir, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    throw new Error('copy engine to platform error');
  }
});
