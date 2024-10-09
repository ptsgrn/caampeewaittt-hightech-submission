import { createId } from '@paralleldrive/cuid2';
import { db } from "./";
import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  imageUrl: text().notNull(),
  role: varchar({ length: 255, enum: ['DinoDocumentator'] }).notNull(),
});

export const documentsTable = pgTable("documents", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  author: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
})

export async function createTables() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" SERIAL PRIMARY KEY,
      "name" VARCHAR(255) NOT NULL,
      "imageUrl" TEXT NOT NULL,
      "role" VARCHAR(255) NOT NULL
    );
  `)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS "documents" (
      "id" SERIAL PRIMARY KEY,
      "title" VARCHAR(255) NOT NULL,
      "content" TEXT NOT NULL,
      "author" TEXT,
      "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP
    );
  `)
}