import type { BetterAuthClientOptions } from 'better-auth/client';
import { createAuthClient } from 'better-auth/react';

export function createAppAuthClient<O extends BetterAuthClientOptions>(options: O) {
  return createAuthClient<O>(options);
}

export type { BetterAuthClientOptions };
