import { Button, Card, Eyebrow, Heading, Paragraph, Section } from './primitives';
import integraLogo from '../assets/integra (1).png';

function AboutCreator() {
  return (
    <Section id="about-creator" labelledBy="about-creator-title">
      <div className="rc-about-layout">
        <Card className="rc-about-card" as="article">
          <Eyebrow>ABOUT THE CREATOR</Eyebrow>
          <Heading as="h2" id="about-creator-title">
            Created by FRC Team 3646 - INTEGRA
          </Heading>
          <Paragraph>
            FRC Team 3646 INTEGRA (Bahcesehir INTEGRA) is a FIRST Robotics Competition team focused
            on high-performance engineering, reliability, and community contribution.
          </Paragraph>
          <Paragraph muted>
            RoboCache was built to solve a recurring competition problem: teams lose time when key
            components fail and local replacement options are hard to find.
          </Paragraph>
          <Paragraph>
            RoboCache is developed and maintained by FRC Team 3646 INTEGRA.
          </Paragraph>
          <div className="rc-about-actions">
            <Button as="a" href="https://team3646.com/" target="_blank" rel="noreferrer">
              Visit Team 3646
            </Button>
            <Button as="link" to="/about" variant="secondary">
              Team + Platform Story
            </Button>
          </div>
        </Card>
        <Card className="rc-about-media" as="article">
          <img
            src={integraLogo}
            alt="FRC Team 3646 INTEGRA identity mark"
            loading="lazy"
          />
        </Card>
      </div>
    </Section>
  );
}

export default AboutCreator;
