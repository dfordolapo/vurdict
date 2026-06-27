# Vurdict
**[Live Demo](https://www.vurdict.site)**

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
- **Monetization (Paywall):** Paystack API (for gated premium analysis)
- **Email/Lead Capture:** Resend API (Waitlist and deduplication)

---

## 🚀 Live Experience

Experience Vurdict live at: **[www.vurdict.site](https://www.vurdict.site)**

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
* **Monetization & Lead Gen:** Detailed dimension analysis is gated behind a premium paywall powered by **Paystack**, while upcoming features use Waitlist forms powered by Resend.
* **Focused Experience:** An opinionated, single-task flow. Designers input their portfolio link, choose their goal, and immediately receive feedback.
* **Premium UX Polish:** Features 60fps score count-up animations, interactive tooltips, custom mobile pull-to-refresh deadzones, and dynamic loading states.

---

## 🌐 Production Deployment
The repository is designed to be deployed directly to **Vercel** as a monorepo. 
- The React application (`client/`) is built and served via Vercel's Edge Network.
- The Express API (`server/`) is deployed as Serverless Functions routing to `/api/*`.
