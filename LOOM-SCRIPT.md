# Loom Video Script — Student Feedback Automation

Use this as your speaking guide. Target length: **5–8 minutes**.

---

## 1. Introduction (30 seconds)

**Say:**
> Hi, I'm [Your Name]. For this assignment, I built a student feedback automation system using React for the front end and n8n for workflow automation. When a student submits feedback through the web form, n8n validates the data, stores it in Google Sheets, applies conditional logic based on the rating, and sends an automated thank-you email.

**Show:** Your running React form in the browser.

---

## 2. Front-End Walkthrough (1–2 minutes)

**Say:**
> The front end is a responsive React form with all required fields: student name, email, course name, rating from 1 to 5, and a feedback message.

**Demonstrate:**
1. Resize the browser to show mobile responsiveness.
2. Click Submit with empty fields → show validation errors.
3. Enter invalid email → show email error.
4. Fill in valid data and submit.

**Explain the code:**
- `App.jsx` — form UI, state, and submit handler
- `api.js` — client-side validation + `fetch()` POST to n8n webhook
- Success and error messages appear after submission

**Say:**
> Client-side validation gives instant feedback. The form sends JSON to n8n using the Fetch API.

---

## 3. n8n Workflow Overview (2–3 minutes)

**Show:** Full n8n workflow screenshot (all nodes visible).

**Say:**
> Here is my n8n workflow. Data flows from left to right through each step.

### Node-by-node explanation

| Node | What to say |
|------|-------------|
| **Receive Feedback (Webhook)** | Receives POST requests from the React form at `/webhook/student-feedback`. |
| **Validate Data (Code)** | Checks that all required fields exist, email format is valid, and rating is 1–5. Returns an error if validation fails. |
| **Is Valid? (IF)** | Routes valid submissions forward; invalid ones go to the error response. |
| **Rating <= 2? (IF)** | Conditional logic: low ratings need extra attention. |
| **Mark Needs Attention (Set)** | If rating is 1 or 2, status = `Needs Attention`. |
| **Mark Received (Set)** | If rating is 3–5, status = `Received`. |
| **Store in Google Sheets** | Appends a new row with all feedback fields and the status. |
| **Send Thank You Email** | Sends: *"Thank you for your feedback! Your response has been received successfully."* |
| **Respond Success / Respond Error** | Sends JSON back to the React app so the user sees success or error. |

**Show:** Google Sheet with a test row (include both a low-rating and high-rating example if possible).

---

## 4. Live Demo (1–2 minutes)

**Demonstrate two submissions:**

### Test A — Low rating (rating = 2)
1. Submit form with rating 2.
2. Show success message on the form.
3. Show Google Sheet → new row with status **Needs Attention**.
4. Show thank-you email in inbox.

### Test B — High rating (rating = 5)
1. Submit form with rating 5.
2. Show Google Sheet → status **Received**.

**Say:**
> The same workflow handles both cases automatically. Low ratings are flagged for follow-up; all submissions are stored and acknowledged by email.

---

## 5. Reflection Questions (1 minute)

Answer these honestly in your own words:

### What challenges did you encounter?
Examples you can adapt:
- Connecting the React app to the n8n webhook URL
- CORS errors when testing locally
- Setting up Google Sheets or SMTP credentials in n8n
- Mapping form field names to n8n node expressions

### How did you solve them?
Examples:
- Copied the Production Webhook URL from n8n into `.env`
- Activated the workflow in n8n before testing
- Created Google Sheet columns to match the workflow mapping
- Used n8n's test execution to debug each node

### What did you learn about workflow automation?
Examples:
- Automation connects separate tools (form → storage → email) without custom backend code
- Validation can happen on both client and server/workflow side
- Conditional logic lets you route data differently based on business rules
- n8n makes it visual and easy to trace each step

---

## 6. Closing (15 seconds)

**Say:**
> This project showed me how front-end forms and automation workflows work together. The React app collects feedback, and n8n handles validation, storage, conditional routing, and notifications automatically. Thank you for watching.

---

## Checklist Before Recording

- [ ] React app runs (`npm run dev`)
- [ ] n8n workflow is **Active**
- [ ] Webhook URL is in `.env`
- [ ] Google Sheet has correct column headers
- [ ] Email credentials are configured in n8n
- [ ] Workflow JSON exported to `n8n/student-feedback-workflow.json`
- [ ] Test submission works end-to-end

## What to Submit in Google Classroom

1. **Source code** — this React project folder
2. **n8n workflow** — `n8n/student-feedback-workflow.json`
3. **Loom video** — link to your recording
