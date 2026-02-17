export const SITE_URL = 'https://robocache.app';

export const HOME_TITLE = 'RoboCache | FRC Parts Exchange by FRC Team 3646 INTEGRA';
export const HOME_DESCRIPTION =
  'RoboCache is a geocache-style FRC parts exchange where FIRST Robotics Competition teams list surplus components, find nearby parts, and coordinate fast sharing.';

export const SEO_KEYWORDS = [
  'RoboCache',
  'FRC parts exchange',
  'FIRST Robotics Competition parts',
  'robotics part sharing',
  'FRC component marketplace',
  'robotics geocache platform',
  'FRC Team 3646 INTEGRA',
];

export interface PageMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  imagePath?: string;
  keywords?: string[];
}

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    const [key, value] = Object.entries(attributes)[0];
    element.setAttribute(key, value);
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertCanonical = (url: string) => {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
};

export const applyMetadata = ({
  title,
  description,
  canonicalPath,
  imagePath = '/og-image.png',
  keywords = SEO_KEYWORDS,
}: PageMetadata) => {
  if (typeof document === 'undefined') return;

  const canonical = `${SITE_URL}${canonicalPath}`;
  const image = `${SITE_URL}${imagePath}`;

  document.title = title;

  upsertMeta('meta[name="description"]', { name: 'description', content: description });
  upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
  upsertMeta('meta[name="author"]', { name: 'author', content: 'FRC Team 3646 INTEGRA' });

  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'RoboCache' });

  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary_large_image',
  });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: description,
  });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

  upsertCanonical(canonical);
};
