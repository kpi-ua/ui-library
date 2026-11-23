import svgr from 'esbuild-plugin-svgr';
import { defineConfig, type Options } from 'tsup';

const shared: Options = {
  format: 'esm',
  sourcemap: true,
  outDir: 'dist',
};

export default defineConfig([
  {
    ...shared,
    entry: {
      'ui/index': 'src/ui/index.ts',
      'hooks/index': 'src/hooks/index.ts',
      'icons/index': 'src/icons/index.ts',
    },
    splitting: true,
    clean: true,
    banner: { js: '"use client";' },
    esbuildPlugins: [svgr({ icon: true, jsxRuntime: 'automatic' })],
  },
  {
    ...shared,
    entry: {
      'lib/index': 'src/lib/index.ts',
      'auth/server/index': 'src/auth/server/index.ts',
      'auth/next/index': 'src/auth/next/index.ts',
    },
    external: [/^next(\/.*)?$/],
  },
]);
