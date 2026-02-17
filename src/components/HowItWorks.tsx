import { Card, Eyebrow, Heading, Paragraph, Section } from './primitives';

const steps = [
  {
    title: 'List available FRC parts',
    detail:
      'Publish surplus FIRST Robotics Competition parts with condition, quantity, and pickup details.',
  },
  {
    title: 'Discover nearby robotics components',
    detail:
      'Search by distance and need to find compatible FRC component marketplace listings in your region.',
  },
  {
    title: 'Coordinate part exchange between teams',
    detail:
      'Confirm transfer logistics directly so teams can restore uptime and continue engineering progress.',
  },
];

function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-it-works-title">
      <div className="rc-section-head">
        <Eyebrow>HOW IT WORKS</Eyebrow>
        <Heading as="h2" id="how-it-works-title">
          FRC parts exchange workflow for FIRST Robotics Competition teams
        </Heading>
        <Paragraph muted>
          RoboCache keeps robotics part sharing simple, visible, and operationally clear.
        </Paragraph>
      </div>
      <div className="rc-step-grid">
        {steps.map((step, index) => (
          <Card key={step.title} as="article" className="rc-step-card">
            <p className="rc-step-index">0{index + 1}</p>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default HowItWorks;
