import { db } from '$lib/db'
import { usersTable, documentsTable, createTables } from '$lib/db/schema'

export async function initDatabase() {
  // Create the tables if they don't exist
  await createTables()
  // Create a user
  if (await db.$count(usersTable) === 0) {
    await db.insert(usersTable).values({
      name: "Dinosao",
      imageUrl: 'https://api.dicebear.com/9.x/thumbs/svg?seed=' + Math.random(),
      role: 'DinoDocumentator',
    })
    console.log("Added 1 user")
  }
}