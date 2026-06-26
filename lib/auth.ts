import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { APIError } from 'better-auth/api';
import { isAllowedAuthEmail } from './auth-allowlist';
import prisma from './prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  databaseHooks: {
    user: {
      create: {
        before: async (data) => {
          if (!isAllowedAuthEmail(data.email as string | undefined)) {
            throw new APIError('FORBIDDEN', {
              message: 'Email not allowed',
            });
          }

          return {
            data: {
              ...data,
              isAdmin: true,
            },
          };
        },
      },
    },
    session: {
      create: {
        before: async (data, ctx) => {
          const user = await ctx?.context.internalAdapter.findUserById(
            data.userId as string,
          );

          if (!isAllowedAuthEmail(user?.email)) {
            throw new APIError('FORBIDDEN', {
              message: 'Email not allowed',
            });
          }
        },
      },
    },
  },
  user: {
    additionalFields: {
      isAdmin: { type: 'boolean', default: false },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    },
  },
});
