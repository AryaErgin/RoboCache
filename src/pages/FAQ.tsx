import '../styles/pages/FAQ.css';

const faqs = [
  { q: 'What is RoboCache?', a: 'RoboCache is a hidden container filled with small items that participants find using GPS coordinates.' },
  { q: 'How does it work?', a: 'You follow the posted coordinates, locate the container, take an item, leave an item, and log your find online.' },
  { q: 'What can be inside the RoboCache?', a: 'Small, safe items like stickers, keychains, 3D-printed pieces, or short message cards.' },
  { q: 'Where is RoboCache placed?', a: 'It is placed only in safe, accessible public locations, not on private or restricted property.' },
  { q: 'How is the location uploaded to the website?', a: 'We record the GPS coordinates when placing the cache and publish them on our website along with a short clue.' },
  { q: 'Why do we run the RoboCache project?', a: 'We use RoboCache to share STEM culture in a fun, interactive, and community-driven way' },
];

function FAQ() {
  return (
    <div className="page faq-page">
      <h1>FAQ</h1>
      <div className="faq-list">
        {faqs.map((item) => (
          <div key={item.q} className="faq-item">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
