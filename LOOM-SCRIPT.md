# Loom Read-Aloud Script (Short)

Read this out loud. About **4–5 minutes**.

---

## 1. Introduction

Hi, I’m [Your Name].

For this assignment, I built a Student Feedback Automation System using React and n8n.

When a student submits feedback, n8n validates the data, stores it in Google Sheets, flags low ratings, and sends a thank-you notification to Discord.

I’ll explain each node in n8n, then demo the form, and finally show the spreadsheet proof.

---

## 2. n8n workflow

This is my n8n workflow. It is Active, and data flows from left to right.

**Receive Feedback** is the Webhook. It receives the POST request from my React form.

**Validate Data** checks that all required fields are present, the email is valid, and the rating is between 1 and 5.

**Is Valid?** decides the next step. Invalid data goes to **Respond Error**. Valid data continues.

**Rating ≤ 2?** applies the assignment’s conditional logic.

If the rating is 1 or 2, **Mark Needs Attention** sets the status to “Needs Attention.”

If the rating is above 2, **Mark Received** sets the status to “Received.”

**Store in Google Sheets** appends a row with the student details, rating, feedback, and status.

**HTTP Request** sends a thank-you message to Discord through a webhook. The rubric allows email, Discord, Telegram, or Slack — I used Discord.

**Respond Success** returns a success message to the React form.

So the flow is: receive, validate, apply rating logic, store, notify, and respond.

---

## 3. Form demo

This is the React feedback form. It includes Student Name, Email, Course Name, Rating 1–5, Feedback Message, and Submit.

It has client-side validation and submits using the Fetch API.

I’ll submit one entry with rating 2 to show the “Needs Attention” path.

The form shows: “Thank you for your feedback! Your response has been received successfully.”

That means n8n received and processed the submission.

---

## 4. Spreadsheet proof

Here is the Google Sheet connected to the workflow.

Each submission adds a new row with Submitted At, Student Name, Email, Course Name, Rating, Feedback Message, and Status.

In this latest row, the rating is 2 and the status is “Needs Attention,” which confirms the conditional logic worked.

Higher ratings are marked as “Received.”

---

## 5. Closing

That’s my Student Feedback Automation System: React for the form, n8n for the workflow, Google Sheets for storage, and Discord for the thank-you notification.

Thank you for watching.
