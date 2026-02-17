import { useEffect } from 'react';
import AboutCreator from '../components/AboutCreator';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Impact from '../components/Impact';
import MapPreview from '../components/MapPreview';
import { HOME_DESCRIPTION, HOME_TITLE, applyMetadata } from '../seo/metadata';
import { applyStructuredData } from '../seo/structuredData';
import { Eyebrow, Heading, Paragraph, Section } from '../components/primitives';
import '../styles/premium.css';

function Home() {
  useEffect(() => {
    applyMetadata({
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      canonicalPath: '/',
    });
    applyStructuredData('/');
  }, []);

  return (
    <div className="rc-home">
      <Hero />
      <HowItWorks />
      <MapPreview />
      <Impact />
      <AboutCreator />
      <Section id="definition-block" labelledBy="definition-title">
        <div className="rc-machine-block">
          <Eyebrow>PLATFORM SUMMARY</Eyebrow>
          <Heading as="h2" id="definition-title">
            RoboCache in clear terms
          </Heading>
          <div className="rc-machine-grid">
            <article>
              <h3>What is RoboCache?</h3>
              <Paragraph>
                RoboCache is a geocache-style FRC parts discovery and exchange platform.
              </Paragraph>
            </article>
            <article>
              <h3>Who created RoboCache?</h3>
              <Paragraph>
                RoboCache was created by FRC Team 3646 INTEGRA (Bahcesehir INTEGRA).
              </Paragraph>
            </article>
            <article>
              <h3>Why was RoboCache built?</h3>
              <Paragraph>
                RoboCache was built as a robotics part-exchange system inspired by geocaching. It was created to help FRC teams find and share parts regionally, reducing wait times and fostering collaboration.
              </Paragraph>
            </article>
            <article>
              <h3>Who is RoboCache for?</h3>
              <Paragraph>
                RoboCache is for FIRST Robotics Competition teams that need fast, regional access
                to available components.
              </Paragraph>
            </article>
          </div>
        </div>
      </Section>
      <FAQ />
      <CTA />
    </div>
  );
}

export default Home;
