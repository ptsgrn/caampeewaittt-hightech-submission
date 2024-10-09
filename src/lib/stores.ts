import { writable } from 'svelte/store';
import type { Document, User } from './types';
import { browser } from '$app/environment';

export const currentUser = writable<User | null>(null)
export const documentStore = writable<Document>({
  id: 0,
  title: '',
  content: '',
  author: "",
  createdAt: new Date(),
  updatedAt: new Date()
})

export const tempDocumentStore = writable<Document>({
  id: 0,
  title: '',
  content: '',
  author: "",
  createdAt: new Date(),
  updatedAt: new Date()
})

if (browser) {
  currentUser.set(JSON.parse(localStorage.getItem('currentUser') ?? 'null'))
  currentUser.subscribe(value => {
    localStorage.setItem('currentUser', JSON.stringify(value))
  })
}