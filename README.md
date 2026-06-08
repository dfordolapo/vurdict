# Vurdict

AI-powered portfolio review for product designers. Paste a URL, select your goal, and receive structured feedback based on a 6-dimension evaluation framework.

## Project Structure

```
├── client/          # React (Vite) frontend
├── server/          # Express API server
├── nextjs/          # Next.js frontend (alternative implementation)
├── PRD.md           # Product requirements
├── AGENTS.md        # AI agent development context
├── AI_EVALUATION_PROMPT.md
├── MARKET_INTELLIGENCE.md
└── RUBRIC.md
```

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express
- **AI**: Claude API (Anthropic)
- **Content Extraction**: Jina Reader
- **Target**: Vercel

## Getting Started

### Client

```bash
cd client
cp .env .env.local    # configure environment
npm install
npm run dev
```

### Server

```bash
cd server
cp .env.example .env  # add your API keys
npm install
npm run dev
```

### Next.js

```bash
cd nextjs
cp .env.local.example .env.local
npm install
npm run dev
```

## MVP Scope

- **Role**: Product Designer only
- **Input**: URL only (no PDF uploads)
- **Auth**: None — stateless analysis
- **Storage**: No database — results are transient
- **Design**: Dark mode only (Linear-style)

## Evaluation Dimensions

1. Structural Logic
2. Critical Thinking
3. Visual Execution
4. Impact Evidence
5. Narrative Tone
6. Positioning Clarity
