import { SITE_URL } from './metadata';

interface StructuredDataInput {
  path?: string;
}

export const buildCoreStructuredData = ({ path = '/' }: StructuredDataInput = {}) => {
  const url = `${SITE_URL}${path}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'RoboCache',
        url: SITE_URL,
        inLanguage: 'en-US',
        description:
          'RoboCache is an FRC part discovery and exchange platform for FIRST Robotics Competition teams.',
        publisher: { '@id': `${SITE_URL}/#creator` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'RoboCache',
        url: SITE_URL,
        logo: `${SITE_URL}/robocache-mark.svg`,
        description:
          'RoboCache is a robotics infrastructure platform that helps FIRST Robotics Competition teams discover and exchange parts.',
        founder: { '@id': `${SITE_URL}/#creator` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#creator`,
        name: 'FRC Team 3646 - INTEGRA',
        alternateName: 'Bahcesehir INTEGRA',
        description:
          'FRC Team 3646 INTEGRA develops and maintains RoboCache to support resilient FIRST Robotics Competition ecosystems.',
        sameAs: ['https://team3646.com/'],
      },
      {
        '@type': 'Thing',
        '@id': `${SITE_URL}/#about`,
        name: 'FIRST Robotics Competition parts ecosystem',
        description:
          'Distributed sharing network for FIRST Robotics Competition parts and robotics resources.',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: 'RoboCache',
        url,
        applicationCategory: 'Robotics Infrastructure',
        operatingSystem: 'Web Browser',
        description:
          'RoboCache is a geocache-style platform for listing surplus FRC parts, finding nearby components, and coordinating exchange between teams.',
        creator: { '@id': `${SITE_URL}/#creator` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        about: { '@id': `${SITE_URL}/#about` },
        audience: {
          '@type': 'Audience',
          audienceType: 'FIRST Robotics Competition teams',
        },
      },
    ],
  };
};

export const faqItems = [
  {
    question: 'What is RoboCache?',
    answer:
      'RoboCache is a geocache-style FRC parts discovery and exchange platform where teams list surplus components and find available parts nearby.',
  },
  {
    question: 'Who created RoboCache?',
    answer:
      'RoboCache was created by FRC Team 3646 INTEGRA, and the platform is developed and maintained by the team.',
  },
  {
    question: 'Why was RoboCache built?',
    answer:
      'RoboCache was built as a robotics part-exchange system inspired by geocaching. It was created to help FRC teams find and share parts regionally, reducing wait times and fostering collaboration.',
  },
  {
    question: 'Who is RoboCache for?',
    answer:
      'RoboCache is for FIRST Robotics Competition teams that need fast access to parts and trusted regional collaboration.',
  },
] as const;

export const buildFaqStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

const injectSchema = (id: string, data: object) => {
  if (typeof document === 'undefined') return;

  const selector = `script[data-schema="${id}"]`;
  let script = document.head.querySelector<HTMLScriptElement>(selector);
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.schema = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

export const applyStructuredData = (path: string = '/') => {
  injectSchema('core', buildCoreStructuredData({ path }));
  injectSchema('faq', buildFaqStructuredData());
};
