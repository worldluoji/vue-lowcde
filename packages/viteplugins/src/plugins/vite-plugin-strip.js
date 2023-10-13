import strip from '@rollup/plugin-strip';

function stripPlugin() {
  return {
    apply: 'build',
    ...strip()
  };
}

export default stripPlugin;
