import { createReactQueryHooks } from '@trpc/react';
import type { ServerRouter } from '../../server/router/router';

export const trpc = createReactQueryHooks<ServerRouter>();
