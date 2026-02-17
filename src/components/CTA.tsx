import { Button, Card, Heading, Paragraph, Section } from './primitives';

function CTA() {
  return (
    <Section className="rc-cta-shell" id="cta">
      <Card className="rc-cta-card" as="article">
        <Heading as="h2">Deploy RoboCache in your regional FRC network</Heading>
        <Paragraph muted>
          Start listing surplus components, discover available FIRST Robotics Competition parts, and
          coordinate direct team-to-team exchange.
        </Paragraph>
        <div className="rc-cta-actions">
          <Button as="link" to="/explore">
            Explore Caches
          </Button>
          <Button as="link" to="/create" variant="ghost">
            List a Part
          </Button>
        </div>
      </Card>
    </Section>
  );
}

export default CTA;
