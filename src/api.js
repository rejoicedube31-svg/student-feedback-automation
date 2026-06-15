// Replace with your n8n Webhook URL after creating the workflow
export const WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://YOUR-N8N-INSTANCE/webhook/student-feedback';

const PLACEHOLDER_HOSTS = ['YOUR-N8N-INSTANCE', 'your-n8n-instance'];

export function isWebhookConfigured() {
  try {
    const { hostname } = new URL(WEBHOOK_URL);
    return !PLACEHOLDER_HOSTS.includes(hostname);
  } catch {
    return false;
  }
}

export const INITIAL_FORM = {
  studentName: '',
  email: '',
  courseName: '',
  rating: '',
  feedbackMessage: '',
};

export function validateForm(form) {
  const errors = {};

  if (!form.studentName.trim()) {
    errors.studentName = 'Student name is required.';
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!form.courseName.trim()) {
    errors.courseName = 'Course name is required.';
  }

  if (!form.rating) {
    errors.rating = 'Please select a rating from 1 to 5.';
  } else if (Number(form.rating) < 1 || Number(form.rating) > 5) {
    errors.rating = 'Rating must be between 1 and 5.';
  }

  if (!form.feedbackMessage.trim()) {
    errors.feedbackMessage = 'Feedback message is required.';
  } else if (form.feedbackMessage.trim().length < 10) {
    errors.feedbackMessage = 'Feedback must be at least 10 characters.';
  }

  return errors;
}

export async function submitFeedback(form) {
  if (!isWebhookConfigured()) {
    throw new Error(
      'Webhook URL is not configured. Add your n8n Production Webhook URL to .env as VITE_N8N_WEBHOOK_URL, then restart npm run dev.'
    );
  }

  let response;

  try {
    response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      studentName: form.studentName.trim(),
      email: form.email.trim(),
      courseName: form.courseName.trim(),
      rating: Number(form.rating),
      feedbackMessage: form.feedbackMessage.trim(),
      submittedAt: new Date().toISOString(),
    }),
    });
  } catch {
    throw new Error(
      'Could not reach the n8n webhook. Check that the workflow is Active, the URL in .env is correct, and n8n is running.'
    );
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Unable to submit feedback. Please try again.');
  }

  const responseText = await response.text();

  if (!responseText.trim()) {
    return {
      success: true,
      message: 'Thank you for your feedback! Your response has been received successfully.',
    };
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return {
      success: true,
      message: 'Thank you for your feedback! Your response has been received successfully.',
    };
  }
}
