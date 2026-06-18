# Vurdict

Vurdict is an AI-powered, goal-aware portfolio review application designed specifically for product designers. By pasting a portfolio URL (such as Behance, Dribbble, or a personal website), designers receive high-fidelity, objective feedback based on a structured 6-dimension evaluation framework.

---

## 🏗️ Project Architecture & Structure

The repository supports a unified deployment structure for ease of local testing and production deployment on Vercel:

```
├── client/          # React (Vite) frontend with Tailwind CSS
├── server/          # Express API Serverless backend
├── AGENTS.md        # AI agent development context & MVP boundaries
└── README.md        # Project documentation
```

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS + Lucide Icons + JavaScript
- **Backend:** Node.js + Express (Serverless Functions via Vercel)
- **Database / Cache:** Vercel KV (Upstash Redis) for background job resilience and caching.
- **AI Core:** Google Gemini API (gemini-2.5-flash via `@google/genai`)
- **Scraping:** Jina Reader API (high-fidelity content extraction)
- **Email/Lead Capture:** Resend API (Waitlist and deduplication)

---

## 🚀 Getting Started (Local Development)

*(Note: These instructions are for developers to run and test the application on their own machines before pushing to production).*

To run the application locally:

### 1. Configure the Backend Environment
Navigate to the server folder and set up your `.env` file:
```bash
cd server
cp .env.example .env
```
Inside the `server/.env` file, populate your credentials:
```env
PORT=3001
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
KV_REST_API_URL=your_vercel_kv_url
KV_REST_API_TOKEN=your_vercel_kv_token
```

### 2. Start the Backend Server
```bash
npm install
npm run dev
```
The API will run on `http://localhost:3001`.

### 3. Start the Frontend App
Open a new terminal window, navigate to the client, and start Vite:
```bash
cd client
npm install
npm run dev
```
The React frontend will be live at **`http://localhost:5173`**.

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
* **Authentication:** No user accounts or login walls (frictionless entry).
* **Background Resilience:** Utilizes Vercel KV Database to safely cache AI analysis jobs if a user's mobile browser drops the connection in the background.
* **Monetization & Lead Gen:** Detailed dimension analysis and new feature access is gated behind Waitlist forms powered by Resend (with in-memory/KV deduplication).
* **Focused Experience:** An opinionated, single-task flow. Designers input their portfolio link, choose their goal, and immediately receive feedback.
* **Premium UX Polish:** Features 60fps score count-up animations, interactive tooltips, custom mobile pull-to-refresh deadzones, and dynamic loading states.

---

## 🌐 Production Deployment
The repository is designed to be deployed directly to **Vercel** as a monorepo. 
- The React application (`client/`) is built and served via Vercel's Edge Network.
- The Express API (`server/`) is deployed as Serverless Functions routing to `/api/*`.
