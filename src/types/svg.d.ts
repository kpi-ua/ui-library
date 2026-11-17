declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  const Component: FC<SVGProps<SVGSVGElement>>;
  export default Component;
}

declare module 'esbuild-plugin-svgr' {
  import type { Plugin } from 'esbuild';

  export default function svgr(options?: Record<string, unknown>): Plugin;
}
