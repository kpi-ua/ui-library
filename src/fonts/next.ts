import { Exo_2 } from 'next/font/google';

// Shipped as raw source: next/font is resolved at compile time, so apps must add this package to transpilePackages.
export const exo2Font = Exo_2({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-exo-2',
});
