import { cp, rm } from 'node:fs';

const src_dir = './packages/runtime/dist';
const dest_dir = './packages/platform/dist/static/engine';

rm(dest_dir, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error(err);
    throw new Error(`delete dest dir ${dest_dir} error`);
  } else {
    cp(src_dir, dest_dir, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        throw new Error('copy engine to platform error');
      }
    });
  }
});
