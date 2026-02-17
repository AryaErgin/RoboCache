/**
 * SEO utilities for setting page meta tags and title
 */

export const setPageMeta = (
  title: string,
  description: string,
  keywords?: string[]
) => {
  // Set page title
  document.title = title;

  // Update or create meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', description);

  // Update or create meta keywords
  if (keywords && keywords.length > 0) {
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute('content', keywords.join(', '));
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);
};

export const SEO_KEYWORDS = {
  general: ['FRC', 'FIRST', 'Robotics', 'RoboCache', 'Geocaching'],
  team: ['FRC Team INTEGRA 3646', 'FIRST Robotics Team'],
  game: ['Robotics Game', 'Treasure Hunt', 'Cache Hunting', 'Mystery Cache'],
  education: ['STEM', 'Robotics Education', 'Learning Game'],
};

export const generateKeywords = (...groups: string[][]): string[] => {
  return Array.from(new Set(groups.flat()));
};
