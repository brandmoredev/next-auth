/**
 * Configures NextAuth for authentication using Prisma as the database adapter.
 * This file sets up the authentication with the given configuration and handles session management with JWT.
 */

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";

import { getUserById } from "@/utils/data/user";

/**
 * Configures NextAuth.js with Prisma adapter and JWT session strategy.
 * 
 * This setup integrates NextAuth.js with Prisma for database operations and 
 * uses JSON Web Tokens (JWT) for session management. The configuration is 
 * extended with additional settings from `authConfig`.
 * 
 * - `auth`: The configured NextAuth instance with Prisma adapter and JWT session strategy.
 * - `handlers`: The NextAuth handlers for authentication actions.
 * - `signIn`: Function to programmatically initiate user sign-in.
 * - `signOut`: Function to programmatically initiate user sign-out.
 * 
 * Example usage in a Next.js API route or middleware:
 * 
 * ```typescript
 * // Example usage in a Next.js API route or middleware
 * import { auth, handlers } from '@/path/to/this/file';
 * 
 * export default function handler(req, res) {
 *   return handlers(req, res);
 * }
 * ```
 */
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events:{
    async linkAccount({ user }) {
      await db.user.update(({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      }))
    }
  },
  callbacks: {
    // async signIn({ user }) {
    //   if (user.id) {
    //     const existingUser = await getUserById(user.id)

    //     if (!existingUser || !existingUser.emailVerified) {
    //       return false
    //     }
    //   }

    //   return true;
    // },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
