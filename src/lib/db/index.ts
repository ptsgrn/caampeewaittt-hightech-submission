import { PGlite } from '@electric-sql/pglite'
import { drizzle } from 'drizzle-orm/pglite';
import { browser } from '$app/environment';

export const dbclient = new PGlite(browser ? "idb://magic-scroll-data" : "memory://")
export const db = drizzle(dbclient)