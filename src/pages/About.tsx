import { useEffect } from 'react';
import { setPageMeta, generateKeywords, SEO_KEYWORDS } from '../utils/seo';
import '../styles/pages/About.css';

function About() {
  useEffect(() => {
    setPageMeta(
      'About RoboCache - FIRST Robotics Geocaching Platform',
      'Learn about RoboCache, the innovative geocaching game for FIRST Robotics teams, FRC participants, and robotics enthusiasts. Discover how we blend robotics education with treasure hunting.',
      generateKeywords(
        SEO_KEYWORDS.general,
        SEO_KEYWORDS.team,
        ['About', 'Robotics Education Platform', 'Community', 'Mission']
      )
    );
  }, []);

  return (
    <div className="page about-page">
      <h1>About RoboCache: Connecting FIRST Robotics Teams Through Geocaching</h1>
      <section>
        <h2>What is RoboCache? A FIRST Robotics Gaming Platform</h2>
        <p>RoboCache is an innovative geocaching platform designed specifically for FIRST Robotics teams, FRC participants, and robotics enthusiasts. It blends traditional geocaching with robotics education, making every cache a micro-lesson, component trade opportunity, or collaborative challenge that invites learners to build hands-on skills.</p>
        
        <p>Whether you're part of FRC Team INTEGRA 3646 or any other FIRST Robotics team, RoboCache provides a unique way to explore robotics discovery in your community while connecting with fellow robotics enthusiasts.</p>
      </section>

      <section>
        <h2>Our Mission: Making Robotics Accessible Through Play</h2>
        <p>Our mission is to make robotics discovery accessible everywhere while keeping safety, mentorship, and respect for local communities at the center. We believe that the best learning happens when FIRST participants and robotics teams work together, share knowledge, and celebrate their discoveries.</p>
      </section>

      <section>
        <h2>Built for the FIRST Robotics Community</h2>
        <p>RoboCache is built by robotics enthusiasts, for robotics enthusiasts. We understand the unique culture of FIRST Robotics, FRC competitions, and the passion that drives teams like INTEGRA 3646. Our platform celebrates that passion and creates new opportunities for connection and learning within the robotics community.</p>
      </section>
    </div>
  );
}

export default About;
