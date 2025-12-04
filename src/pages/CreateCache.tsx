import { FormEvent, useState } from 'react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { createCache } from '../utils/firestore';
import '../styles/pages/CreateCache.css';

const initialForm = {
  title: '',
  location: '',
  category: '',
  difficulty: '',
  rewardSummary: '',
  safety: '',
  education: '',
  coordinates: '',
};

function CreateCache() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');

  const update = (key: keyof typeof initialForm, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.title || !form.location) {
      setStatus('Please add a title and location to publish a cache.');
      return;
    }
    try {
      const [lat, lng] = form.coordinates.split(',').map((value) => Number(value.trim()));
      await createCache({
        title: form.title,
        location: form.location,
        category: form.category || 'General',
        difficulty: form.difficulty || 'Easy',
        rewardSummary: form.rewardSummary || 'Surprise reward revealed on check-in.',
        description: form.education || 'A surprise robotics drop—no tasks required, rewards unlock when you arrive.',
        hint: form.safety || 'See onsite safety note',
        education: form.education || 'Share a robotics learning takeaway without spoilers.',
        coordinates: { lat: lat || 0, lng: lng || 0 },
        taskFree: true,
      });
      setStatus('Cache saved to Google Cloud Firestore.');
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus('Could not save to Firestore. Check your Google credentials and retry.');
    }
  };

  return (
    <div className="page create-cache-page">
      <header className="page-header">
        <p className="eyebrow">Create</p>
        <h1>Publish a robotics cache</h1>
        <p className="lede">Share a surprise robotics reward with coordinates, safety notes, and an educational takeaway—no tasks or spoilers.</p>
      </header>

      <form className="cache-form" onSubmit={handleSubmit}>
        <FormInput label="Title" value={form.title} onChange={(e) => update('title', e.target.value)} />
        <FormInput label="Location" value={form.location} onChange={(e) => update('location', e.target.value)} />
        <FormInput label="Coordinates" placeholder="40.7128,-74.0060" value={form.coordinates} onChange={(e) => update('coordinates', e.target.value)} />
        <FormInput label="Category" placeholder="Electronics, mechanical, programming" value={form.category} onChange={(e) => update('category', e.target.value)} />
        <FormInput label="Difficulty" placeholder="Easy / Medium / Hard" value={form.difficulty} onChange={(e) => update('difficulty', e.target.value)} />
        <FormInput label="Reward hint (no spoilers)" placeholder="Mystery reward revealed on check-in" value={form.rewardSummary} onChange={(e) => update('rewardSummary', e.target.value)} />
        <FormInput label="Safety note" value={form.safety} onChange={(e) => update('safety', e.target.value)} />
        <FormInput label="Educational note" value={form.education} onChange={(e) => update('education', e.target.value)} />
        <div className="form-actions">
          <Button type="submit" variant="secondary">Save draft</Button>
          <Button type="button" variant="ghost" onClick={() => setForm(initialForm)}>Clear</Button>
        </div>
        {status && <p className="form-status">{status}</p>}
      </form>
    </div>
  );
}

export default CreateCache;
