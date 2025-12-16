export type Cache = {
  id: string;
  title: string;
  location: string;
  category: string;
  lastLoggedBy?: string;
  lastLoggedAt?: unknown;
  rewardSummary: string;
  description: string;
  hint: string;
  education: string;
  coordinates: { lat: number; lng: number };
  xp: number;
  taskFree?: boolean;
  createdAt?: unknown;
};

export type CacheFilters = {
  location: string;
  category: string;
};
