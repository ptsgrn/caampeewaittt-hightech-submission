import { db } from '$lib/db'
import { usersTable } from '$lib/db/schema'
import { currentUser } from '$lib/stores'

export async function login() {
  const dbUser = await db.select().from(usersTable).limit(1)
  currentUser.set(dbUser[0])
}

export function logout() {
  currentUser.set(null)
}

