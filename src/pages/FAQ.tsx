import '../styles/pages/FAQ.css';

const faqs = [
  { q: 'Is RoboCache free to use?', a: 'Yes. Browsing caches is free; creating caches requires a verified account for safety.' },
  { q: 'How do trades work?', a: 'Bring an equivalent robotics part or complete the posted challenge, then log your find.' },
  { q: 'Is it safe for students?', a: 'Caches include safety notes and mentors can flag any risky content. Use common sense in the field.' },
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
