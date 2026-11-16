import { betterAuth, type BetterAuthOptions } from 'better-auth';

// Shared defaults applied to every app; app-provided options win.
export const defaultAuthOptions = {} satisfies Partial<BetterAuthOptions>;

export function createAuth<const O extends BetterAuthOptions>(options: O) {
  return betterAuth({ ...defaultAuthOptions, ...options });
}

export type { BetterAuthOptions };
