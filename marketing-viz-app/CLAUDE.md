# Claude Instructions for GTM AI & Ops

## Project Overview

This is a documentation and visualization site for GTM (Go-To-Market) AI & Operations content.

### Core Purpose
- Visualize and document GTM strategies and AI-powered operations
- Target audience: Internal stakeholders
- Focus: Get to content immediately, clean and minimal presentation

### Site Structure
- **Homepage** (`/`) - Main entry point

### Design Principles
- Modern/minimal aesthetic (Linear, Notion style)
- No unnecessary icons next to headers
- Hover tooltips and click-to-expand details where useful
- Cards with visual workflows, tables, and metrics
- Get to content right away - no hero sections or marketing copy

## Task Execution Rules

### Break Down Tasks
Every task should be broken into small steps that take **less than 3 minutes** to execute each.

### Long Prompts
If a prompt requires multiple steps:
1. Execute the **first step only**
2. Create a **plan file** or use **TodoWrite** to capture remaining steps
3. Complete remaining steps sequentially after first step succeeds

### Example Workflow
```
User: "Add a new section with 5 subsections and examples"

Step 1: Create the basic section structure (< 3 min)
Step 2: Add first subsection content (< 3 min)
Step 3: Add second subsection content (< 3 min)
... continue until complete
```

## Tech Stack Reference
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS with CSS custom properties
- Framer Motion for animations
- Lucide React for icons
- React Flow for diagrams (if needed)
- Recharts for charts (if needed)

## Key Files
- `/src/app/page.tsx` - Homepage
- `/src/components/ui/` - Reusable UI components (Card, Badge, etc.)
- `/src/app/globals.css` - Design tokens and CSS variables

## Deployment
- Static export to Google Cloud Storage
- Run `npm run build` to generate static files in `/out`
- Deploy to GCS bucket configured in `next.config.ts`
