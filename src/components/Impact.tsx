import { Card, Eyebrow, Heading, Paragraph, Section } from './primitives';

const outcomes = [
  {
    title: 'Reduces build-season downtime',
    body: 'Teams find replacement components quickly instead of pausing assembly and testing cycles.',
  },
  {
    title: 'Prevents part waste',
    body: 'Surplus inventory moves to teams that need it now, extending the useful life of FRC hardware.',
  },
  {
    title: 'Improves competitive resilience',
    body: 'Distributed sourcing lowers single-point failure risk during critical match preparation windows.',
  },
  {
    title: 'Strengthens FIRST Robotics Competition networks',
    body: 'Regional robotics part sharing builds trusted collaboration between teams and mentors.',
  },
];

function Impact() {
  return (
    <Section id="impact" labelledBy="impact-title">
      <div className="rc-section-head">
        <Eyebrow>PLATFORM IMPACT</Eyebrow>
        <Heading as="h2" id="impact-title">
          Competitive outcomes from robotics part sharing
        </Heading>
        <Paragraph muted>
          RoboCache works as operational robotics infrastructure, not a generic listing board.
        </Paragraph>
      </div>
      <div className="rc-impact-grid">
        {outcomes.map((outcome) => (
          <Card as="article" key={outcome.title} className="rc-impact-card">
            <h3>{outcome.title}</h3>
            <p>{outcome.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default Impact;
