# Vurdict MVP PRD

## Product Overview

Vurdict is an AI-powered portfolio review platform for product designers.

Users paste a portfolio URL, select their goal, and receive structured feedback based on a predefined evaluation framework.

Unlike generic AI feedback tools, Vurdict evaluates portfolios differently depending on the user's goal. A designer seeking employment requires different portfolio signals than a designer trying to win freelance clients.

The MVP focuses on one role: Product Designer.

---

## Problem Statement

Product designers frequently struggle to understand why their portfolios are not generating interviews or client inquiries.

Most feedback available today falls into one of three categories:

* Generic AI feedback
* Inconsistent community feedback
* Expensive expert reviews

Existing tools rarely account for context. The feedback a hiring manager would give differs significantly from the feedback a potential freelance client would give.

Designers need fast, structured, goal-aware portfolio feedback.

---

## Target Users

### Primary Users

Junior and mid-level product designers with 0-4 years of experience who:

* Are actively job hunting
* Want to attract freelance clients
* Need actionable portfolio feedback

### Secondary Users

* Design bootcamp graduates
* Career switchers entering product design
* Design mentors reviewing student portfolios

---

## MVP Goal

Allow a product designer to:

1. Select a goal
2. Submit a portfolio URL
3. Receive a structured evaluation
4. Identify the highest-impact improvement

---

## User Flow

Landing Page

↓

Select Goal

↓

Paste Portfolio URL

↓

Analyze Portfolio

↓

Loading State

↓

Results Page

---

## In Scope

### Portfolio Submission

* URL input
* URL validation
* Goal selection

### AI Evaluation

* Read portfolio content from URL
* Evaluate against rubric
* Generate category scores
* Generate written explanations
* Identify highest-priority improvement

### Results Page

* Overall score
* Six category scores
* Written feedback
* Fix This First recommendation

---

## Out of Scope

* User accounts
* Saved history
* Multiple design roles
* PDF uploads
* Portfolio comparisons
* Team reviews
* Payment system
* Email reports
* Mobile application

---

## Evaluation Categories

### Problem Framing

Does the portfolio clearly explain the problem being solved?

### Process Visibility

Does the portfolio show how decisions were made?

### Outcome & Impact

Does the work demonstrate measurable or observable results?

### Visual Quality

Does the portfolio communicate professionalism and design competence?

### Niche & Positioning

Does the designer communicate a clear area of focus?

### Trust & CTA Strength

Does the portfolio establish credibility and provide a clear next step?

---

## Goal Types

### Get Hired

Prioritize:

* Problem Framing
* Process Visibility
* Outcomes

### Win Freelance Clients

Prioritize:

* Niche Positioning
* Trust Signals
* Clear CTA

---

## Success Metrics

### Product Success

* User receives results within 30 seconds
* Evaluation returns all category scores
* Results page loads successfully

### User Success

User can answer:

* What is weak in my portfolio?
* What should I fix first?
* Why was this score given?

---

## Tech Stack

Frontend:

* React
* Tailwind CSS

Backend:

* Node.js
* Express

AI:

* Claude API

Portfolio Reader:

* Jina Reader

Hosting:

* Vercel

---

## Future Versions

* Additional creative roles
* PDF uploads
* Portfolio history
* User accounts
* Portfolio comparison
* Team reviews
* Progress tracking
* Premium reports
