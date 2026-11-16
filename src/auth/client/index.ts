import { createAuthClient } from 'better-auth/react';
import type { BetterAuthClientOptions } from 'better-auth/client';

export function createAppAuthClient<O extends BetterAuthClientOptions>(options: O) {
  return createAuthClient<O>(options);
}

export type { BetterAuthClientOptions };
