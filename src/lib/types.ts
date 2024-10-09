export interface User {
  id: number
  name: string
  imageUrl: string
  role: string
}

export interface Document {
  title: string;
  id: number;
  content: string;
  author: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}