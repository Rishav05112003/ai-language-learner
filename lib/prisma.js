import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// everytime next js used hot overload,it will create a new prisma client
// we dont want that so using the if statement
// we are storing the primsa client in a golbal variable ensuring that the prisma client instance
// is reused accrodd hot reloads during development
