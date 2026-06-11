# Vurdict Development Context (Agents)

This document serves as the primary context for any AI agents working on the Vurdict project. It defines the project boundaries, technical standards, and goals.

---

## 1. Project Mission
To provide product designers with objective, goal-aware portfolio feedback using high-fidelity AI analysis.

## 2. MVP Boundaries (Avoid Scope Creep)
- **Role Support**: ONLY Product Designer. No other roles.
- **Input**: URL only. No PDF uploads.
- **Auth**: No user accounts. Stateless analysis.
- **Persistence**: No database. Results are transient or shared via URL only (if implemented).
- **Design**: Clean, modern light mode.

## 3. Technical Standards

### Frontend
- **Framework**: React (Vite).
- **Styling**: Tailwind CSS.
- **Design Tokens**: 
  - Colors: Indigo, Violet, Slate, Zinc.
  - Typography: Inter / Modern Sans-Serif.
- **Components**: Functional components with hooks. Clean separation of UI and Logic.

### Backend
- **Framework**: Express (Node.js).
- **Architecture**: Service-oriented.
  - `JinaService`: Handles content extraction.
  - `ClaudeService`: Handles prompt construction and LLM interaction.
- **Error Handling**: Graceful handling of URL timeouts, 404s, and LLM parsing errors.

## 4. Coding Philosophy
- **Rich Aesthetics First**: If a component looks "default," it's a failure. Use gradients, subtle shadows, and glassmorphism.
- **Performance**: Analysis should feel fast. Use optimistic UI or engaging loading states.
- **Accessibility**: Semantic HTML and ARIA labels for all interactive elements.

## 5. Deployment Goal
- Target: Vercel.
- Structure: Root contains `/client` and `/server`.

---

## 6. Current Phase
**Discovery & Strategy Phase (Completed)**.
Next Phase: Infrastructure & Backend Core.
