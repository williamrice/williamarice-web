import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  databaseHooks: {
    user: {
      create: {
        before: async (data) => {
          const email = data.email as string;
          const allowedEmail = process.env.ALLOWED_AUTH_EMAIL as string;
          if (email !== allowedEmail) {
            throw new Error("Email not allowed");
          }
        },
      },
    },
  },
  user: {
    additionalFields: {
      isAdmin: { type: "boolean", default: false },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    },
  },
});
