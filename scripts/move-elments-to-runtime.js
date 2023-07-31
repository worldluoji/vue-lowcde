import { cp, rm } from 'node:fs';

const src_dir = './packages/elements/dist/__StandardElements__';
const dest_dir = './packages/runtime/dist/static/__StandardElements__';

rm(dest_dir, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error(err);
    throw new Error(`delete dest dir ${dest_dir} error`);
  } else {
    cp(src_dir, dest_dir, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        throw new Error('copy elements to runtime error');
      }
    });
  }
});
