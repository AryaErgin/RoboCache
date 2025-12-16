import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  increment,
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import type { Cache } from './types';
import { db } from './firebase';

const cachesCollection = collection(db, 'caches');

export async function fetchCaches(): Promise<Cache[]> {
  const snapshot = await getDocs(cachesCollection);
  return snapshot.docs.map((document: QueryDocumentSnapshot<DocumentData>) => {
    const data = document.data();
    return {
      id: document.id,
      title: data.title ?? 'Untitled cache',
      location: data.location ?? 'Unknown',
      category: data.category ?? 'General',
      lastLoggedBy: data.lastLoggedBy,
      lastLoggedAt: data.lastLoggedAt,
      rewardSummary: data.rewardSummary ?? 'Surprise reward revealed on check-in.',
      description: data.description ?? 'No description yet',
      hint: data.hint ?? 'No hint provided',
      education: data.education ?? 'Educational note coming soon',
      coordinates: data.coordinates ?? { lat: 0, lng: 0 },
      xp: data.xp ?? 50,
      taskFree: data.taskFree ?? true,
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
    lastLoggedBy: data.lastLoggedBy,
    lastLoggedAt: data.lastLoggedAt,
    rewardSummary: data.rewardSummary ?? 'Surprise reward revealed on check-in.',
    description: data.description,
    hint: data.hint,
    education: data.education,
    coordinates: data.coordinates,
    xp: data.xp ?? 50,
    taskFree: data.taskFree ?? true,
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

// Log a cache for a user: increment their found count and xp, record the cache id,
// and delete the cache document so it can't be claimed again.
export async function logCacheForUser(userId: string, cacheId: string, xpGain: number, userName?: string) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // create initial user stats
    await setDoc(userRef, {
      foundCount: 1,
      createdCount: 0,
      xp: xpGain,
      foundIds: [cacheId],
    });
  } else {
    const data = userSnap.data() as DocumentData;
    const foundIds: string[] = data.foundIds ?? [];
    if (foundIds.includes(cacheId)) {
      throw new Error('Cache already logged for this user');
    }
    await updateDoc(userRef, {
      foundCount: increment(1),
      xp: increment(xpGain),
      foundIds: arrayUnion(cacheId),
    });
  }

  // update the cache document to record who last logged it and when
  const cacheRef = doc(db, 'caches', cacheId);
  await updateDoc(cacheRef, {
    lastLoggedBy: userName ?? userId,
    lastLoggedAt: Timestamp.now(),
  });
}

export async function recordCacheCreation(userId: string, cacheId: string) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      foundCount: 0,
      createdCount: 1,
      xp: 0,
      createdIds: [cacheId],
    });
  } else {
    await updateDoc(userRef, {
      createdCount: increment(1),
      createdIds: arrayUnion(cacheId),
    });
  }
}

export async function fetchUserStats(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return null;
  const data = userSnap.data();
  return {
    foundCount: data.foundCount ?? 0,
    createdCount: data.createdCount ?? 0,
    xp: data.xp ?? 0,
    foundIds: data.foundIds ?? [],
  };
}
