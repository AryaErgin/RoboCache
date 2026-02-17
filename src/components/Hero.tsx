import { motion, useReducedMotion } from 'framer-motion';
import { Button, Card, Eyebrow, Heading, Paragraph } from './primitives';

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="rc-hero" aria-labelledby="robocache-hero-title">
      <div className="rc-hero-grid">
        <motion.div
          className="rc-hero-copy"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>FRC PARTS EXCHANGE INFRASTRUCTURE</Eyebrow>
          <Heading as="h1" className="rc-hero-title" id="robocache-hero-title">
            RoboCache - A Geocache-Style Platform for FRC Parts
          </Heading>
          <Paragraph className="rc-hero-lede">
            RoboCache is a geocache-style FRC parts discovery and exchange platform where FIRST
            Robotics Competition teams list surplus components, discover nearby parts, and
            coordinate rapid part transfers.
          </Paragraph>
          <Paragraph muted className="rc-hero-subtitle">
            Built by FRC Team 3646 INTEGRA to strengthen competitive robotics ecosystems.
          </Paragraph>
          <div className="rc-hero-actions">
            <Button as="link" to="/explore">
              Explore Caches
            </Button>
            <Button as="link" to="/create" variant="ghost">
              List a Part
            </Button>
          </div>
        </motion.div>

        <Card className="rc-hero-panel" as="article">
          <h2>Operational Snapshot</h2>
          <dl className="rc-hero-stats">
            <div>
              <dt>Primary use case</dt>
              <dd>FRC parts exchange during build and competition season</dd>
            </div>
            <div>
              <dt>Coverage model</dt>
              <dd>Proximity-based robotics geocache platform</dd>
            </div>
            <div>
              <dt>Ownership</dt>
              <dd>Developed and maintained by FRC Team 3646 INTEGRA</dd>
            </div>
          </dl>
        </Card>
      </div>
    </section>
  );
}

export default Hero;
