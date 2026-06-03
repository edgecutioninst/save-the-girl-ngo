/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/db/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // --- THE MASTER OVERRIDE INTERCEPT ---
        if (
          process.env.MASTER_ADMIN_USER &&
          process.env.MASTER_ADMIN_PASS &&
          credentials.username === process.env.MASTER_ADMIN_USER &&
          credentials.password === process.env.MASTER_ADMIN_PASS
        ) {
          return {
            id: "master-admin-override",
            name: "Master Admin",
            username: credentials.username,
            role: "ADMIN",
          };
        }

        // --- STANDARD DATABASE CHECK ---
        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.username = (user as any).username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).username = token.username;
      }
      return session;
    }
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", 
  }
};