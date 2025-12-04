import { collection, addDoc, getDocs, getDoc, doc, Timestamp } from 'firebase/firestore';
import type { Cache } from './types';
import { db } from './firebase';

const cachesCollection = collection(db, 'caches');

export async function fetchCaches(): Promise<Cache[]> {
  const snapshot = await getDocs(cachesCollection);
  return snapshot.docs.map((document) => {
    const data = document.data();
    return {
      id: document.id,
      title: data.title ?? 'Untitled cache',
      location: data.location ?? 'Unknown',
      category: data.category ?? 'General',
      difficulty: data.difficulty ?? 'Easy',
      tools: data.tools ?? [],
      description: data.description ?? 'No description yet',
      hint: data.hint ?? 'No hint provided',
      education: data.education ?? 'Educational note coming soon',
      coordinates: data.coordinates ?? { lat: 0, lng: 0 },
      xp: data.xp ?? 50,
      createdAt: data.createdAt ?? Timestamp.now(),
    } as Cache;
  });
}

export async function fetchCacheById(id: string): Promise<Cache | null> {
  const documentRef = doc(db, 'caches', id);
  const snapshot = await getDoc(documentRef);
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    id: snapshot.id,
    title: data.title,
    location: data.location,
    category: data.category,
    difficulty: data.difficulty,
    tools: data.tools ?? [],
    description: data.description,
    hint: data.hint,
    education: data.education,
    coordinates: data.coordinates,
    xp: data.xp ?? 50,
    createdAt: data.createdAt ?? Timestamp.now(),
  } as Cache;
}

export async function createCache(payload: Omit<Cache, 'id' | 'xp'> & { xp?: number }) {
  const docPayload = {
    ...payload,
    xp: payload.xp ?? 100,
    createdAt: Timestamp.now(),
  };
  const newDoc = await addDoc(cachesCollection, docPayload);
  return newDoc.id;
}
