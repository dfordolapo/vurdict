# Vurdict

Vurdict is an AI-powered, goal-aware portfolio review application designed specifically for product designers. By pasting a portfolio URL (such as Behance, dribbble, or a personal website), designers receive high-fidelity, objective feedback based on a structured 6-dimension evaluation framework.

---

## 🏗️ Project Architecture & Structure

The repository supports a unified staging structure for ease of local testing and production deployment:

```
├── client/          # React (Vite + TypeScript) frontend
├── server/          # Express API server (serves the built client)
├── nextjs/          # Next.js frontend (alternative implementation)
├── PRD.md           # Product requirements document
├── AGENTS.md        # AI agent development context & MVP boundaries
├── AI_EVALUATION_PROMPT.md  # Core prompt definitions for the LLM
├── RUBRIC.md        # The evaluation criteria for the 6-dimension review
└── MARKET_INTELLIGENCE.md  # Target user and positioning details
```

### 🔗 Unified Origin Setup
To bypass mobile/tunnel CORS issues, the backend is configured to host the static assets directly. The Express server serves compiled static files from `client/dist`. Relative routing is used for API communication, eliminating cross-origin request issues.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS + Lucide Icons + JavaScript
- **Backend:** Node.js + Express
- **AI Core:** Google Gemini API (gemini-2.5-flash via `@google/genai` with built-in retry/backoff logic)
- **Scraping:** Jina Reader API (high-fidelity content extraction)
- **Live Previews:** `thum.io` (for live webpage screenshot generation on the results dashboard)

---

## 🚀 Getting Started

To run the unified application locally:

### 1. Build the Frontend Assets
Generate the client distribution bundle so the backend can serve it:
```bash
cd client
npm install
npm run build
```

### 2. Configure the Backend
Navigate to the server folder, configure your keys, and install dependencies:
```bash
cd ../server
cp .env.example .env
```
Inside the `server/.env` file, populate your credentials:
```env
PORT=3001
GEMINI_API_KEY=your_gemini_api_key
# Optional: add other endpoints or override defaults
```

### 3. Start the Server
Run the watch/dev server:
```bash
npm install
npm run dev
```
The unified application will be live at **`http://localhost:3001`**.

---

## 📊 Evaluation Dimensions

Vurdict grades portfolios against six distinct hiring dimensions:
1. **Structural Logic:** Case study outline, clarity, and information hierarchy.
2. **Critical Thinking:** Problem definition, user empathy, and validation process.
3. **Visual Execution:** Layout, typography, component styling, and UX patterns.
4. **Impact Evidence:** Key results, metrics, learnings, and performance data.
5. **Narrative Tone:** Professionalism, readability, storytelling, and clarity.
6. **Positioning Clarity:** Alignment with role expectations and career experience level.

---

## ⚙️ MVP Boundaries & Core Rules
* **Role Support:** Exclusively Product Designer roles.
* **Stateless:** No user accounts, database persistence, or long-term storage (results are transient and rely on `sessionStorage`, shareable via base64 encoded URL).
* **Monetization (Paywall):** Users can view the high-level report card for free, but detailed dimension analysis and priority action plans are gated behind a ₦2,500 paywall powered by Paystack.
* **Focused Experience & Single Workflow:** An opinionated, single-task flow. Designers input their portfolio link, choose their goal, and immediately receive feedback without accounts or distractions.
* **Premium UX Polish:** Features 60fps score count-up animations, interactive tooltips, and dynamic loading states.
* **Clean Typographic Aesthetic:** A high-contrast light theme design featuring deep navy brand colors (`#172554`), modern typography, subtle micro-animations, and frosted glassmorphism overlays.

---

## 🌐 Deployment
The repository includes a `vercel.json` file configured for a unified monorepo deployment on **Vercel**. 
- The React application (`client/`) is served statically.
- The Express API (`server/`) is deployed as a Serverless Function on the `/api/*` route.

