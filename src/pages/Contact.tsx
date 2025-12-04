import Button from '../components/Button';
import FormInput from '../components/FormInput';
import '../styles/pages/Contact.css';

function Contact() {
  return (
    <div className="page contact-page">
      <h1>Contact & Report</h1>
      <p>Questions, partnership ideas, or safety reports? Reach out and our moderators will respond quickly.</p>
      <div className="contact-form">
        <FormInput label="Name" placeholder="Your name" />
        <FormInput label="Email" placeholder="you@example.com" />
        <FormInput label="Message" placeholder="What do you want to share?" />
        <Button variant="secondary" type="button">Send</Button>
      </div>
    </div>
  );
}

export default Contact;
