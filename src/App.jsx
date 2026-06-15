import { useState } from 'react';
import { INITIAL_FORM, submitFeedback, validateForm } from './api';
import './App.css';

function App() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await submitFeedback(form);
      setForm(INITIAL_FORM);
      setErrors({});
      setStatus({
        type: 'success',
        message: result?.message || 'Thank you! Your feedback was submitted successfully.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <main className="card">
        <header className="card__header">
          <p className="eyebrow">Training Company</p>
          <h1>Student Feedback Form</h1>
          <p className="subtitle">
            Share your experience so we can improve our courses and support.
          </p>
        </header>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="studentName">Student Name</label>
            <input
              id="studentName"
              name="studentName"
              type="text"
              value={form.studentName}
              onChange={handleChange}
              placeholder="Jane Doe"
              aria-invalid={Boolean(errors.studentName)}
            />
            {errors.studentName && <span className="field__error">{errors.studentName}</span>}
          </div>

          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <span className="field__error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="courseName">Course Name</label>
            <input
              id="courseName"
              name="courseName"
              type="text"
              value={form.courseName}
              onChange={handleChange}
              placeholder="Web Development Bootcamp"
              aria-invalid={Boolean(errors.courseName)}
            />
            {errors.courseName && <span className="field__error">{errors.courseName}</span>}
          </div>

          <div className="field">
            <label htmlFor="rating">Rating (1–5)</label>
            <select
              id="rating"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              aria-invalid={Boolean(errors.rating)}
            >
              <option value="">Select a rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value} - {value === 1 ? 'Poor' : value === 5 ? 'Excellent' : 'Average'}
                </option>
              ))}
            </select>
            {errors.rating && <span className="field__error">{errors.rating}</span>}
          </div>

          <div className="field">
            <label htmlFor="feedbackMessage">Feedback Message</label>
            <textarea
              id="feedbackMessage"
              name="feedbackMessage"
              rows="5"
              value={form.feedbackMessage}
              onChange={handleChange}
              placeholder="Tell us what went well and what we can improve..."
              aria-invalid={Boolean(errors.feedbackMessage)}
            />
            {errors.feedbackMessage && (
              <span className="field__error">{errors.feedbackMessage}</span>
            )}
          </div>

          <button className="submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>

          {status.message && (
            <div className={`alert alert--${status.type}`} role="status">
              {status.message}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

export default App;
