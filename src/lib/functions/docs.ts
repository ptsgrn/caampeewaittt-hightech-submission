import { db } from '$lib/db';
import { documentsTable } from '$lib/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function getDocuments() {
  const documents = await db.select().from(documentsTable).orderBy(desc(documentsTable.updatedAt))
  return documents
}

export async function getDocument(documentId: number) {
  const document = await db.select().from(documentsTable).where(eq(documentsTable.id, documentId))
  return document[0];
}

export async function createNewDocument({ title = "ไม่มีชื่อ", content = 'เพิ่มเนื้อหาที่นี่', author = "ไม่ทราบ" }: { title: string, content: string, author: string }) {
  const newDocument = await db.insert(documentsTable).values({
    title,
    content,
    author,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning()
  return newDocument
}

export async function updateDocument(documentId: number, data: typeof documentsTable.$inferInsert) {
  const updatedDocument = await db
    .update(documentsTable)
    .set(data)
    .where(
      eq(documentsTable.id, documentId)
    )
    .returning()
  return updatedDocument
}

export async function deleteDocument(documentId: number) {
  const deletedDocument = await db.delete(documentsTable).where(eq(documentsTable.id, documentId))
  return deletedDocument
}