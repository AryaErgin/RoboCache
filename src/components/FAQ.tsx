import { Link } from 'react-router-dom';
import { faqItems } from '../seo/structuredData';
import { Card, Eyebrow, Heading, Paragraph, Section } from './primitives';

function FAQ() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="rc-section-head">
        <Eyebrow>FAQ</Eyebrow>
        <Heading as="h2" id="faq-title">
          RoboCache answers for teams
        </Heading>
        <Paragraph muted>
          Clear answers about what RoboCache is, who created it, and why teams use it.
        </Paragraph>
      </div>
      <div className="rc-faq-list">
        {faqItems.map((item) => (
          <Card as="article" key={item.question} className="rc-faq-card">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </Card>
        ))}
      </div>
      <p className="rc-faq-more">
        Need more details? Read the full <Link to="/faq">RoboCache FAQ</Link>.
      </p>
    </Section>
  );
}

export default FAQ;
