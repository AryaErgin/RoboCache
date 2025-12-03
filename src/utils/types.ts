export type Cache = {
  id: string;
  title: string;
  location: string;
  category: string;
  difficulty: string;
  tools: string[];
  description: string;
  hint: string;
  education: string;
  coordinates: { lat: number; lng: number };
  xp: number;
};

export type CacheFilters = {
  location: string;
  category: string;
  difficulty: string;
};
