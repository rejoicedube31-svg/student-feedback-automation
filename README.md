# Student Feedback Automation

React feedback form + n8n workflow for the training company assignment.

## Quick Start

```bash
cd C:\Users\rejoi\Projects\student-feedback-automation
npm install
copy .env.example .env
npm run dev
```

Update `.env` with your n8n webhook URL.

## Deliverables

- React source code in `src/`
- n8n workflow export in `n8n/student-feedback-workflow.json`
- Loom script in `LOOM-SCRIPT.md`

## Google Sheet Columns

Create a sheet with these headers:

`Submitted At | Student Name | Email | Course Name | Rating | Feedback Message | Status`
