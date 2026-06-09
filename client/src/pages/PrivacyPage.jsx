import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between select-none font-sans relative overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg h-16 px-6 md:px-12 border-b border-slate-100 flex items-center">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <Logo onClick={() => navigate('/')} />
          <button
            onClick={() => navigate('/')}
            className="text-xs font-normal text-slate-500 hover:text-brand-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>← Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-24 md:py-32 text-left space-y-8 select-text">
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-400 font-medium">
            Effective Date: June 8, 2026 &bull; Last Updated: June 8, 2026
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mt-6 uppercase tracking-wider">1. Who We Are</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Vurdict is an AI-powered portfolio review tool that helps product designers get structured, goal-aware feedback on their case studies. We are based in Nigeria and operate at{" "}
            <a href="https://vurdict.vercel.app" target="_blank" rel="noopener noreferrer" className="text-brand-900 font-medium hover:underline">
              vurdict.vercel.app
            </a>.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            For privacy-related questions, contact us at:{" "}
            <a href="mailto:vurdict@gmail.com" className="text-brand-900 font-medium hover:underline">
              vurdict@gmail.com
            </a>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mt-6 uppercase tracking-wider">2. What We Collect</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal font-semibold">When you analyze a case study:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 font-normal">
            <li>The URL you submit for analysis</li>
            <li>Your selected goal (Get Hired, Win Freelance Clients, Improve Portfolio Quality)</li>
            <li>Your selected experience level (Junior, Mid-Level, Senior)</li>
          </ul>

          <p className="text-sm text-slate-600 leading-relaxed font-normal font-semibold pt-2">When you join the waitlist or save a report:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 font-normal">
            <li>Your email address</li>
          </ul>

          <p className="text-sm text-slate-600 leading-relaxed font-normal font-semibold pt-2">Automatically:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 font-normal">
            <li>Basic usage data (pages visited, time on site) via Vercel Analytics</li>
            <li>Your device type and browser (for performance optimization)</li>
          </ul>

          <p className="text-sm text-slate-600 leading-relaxed font-normal pt-2">
            We do not collect your name, location, payment information, or any information beyond what is listed above.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mt-6 uppercase tracking-wider">3. How We Use Your Data</h2>
          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-800 font-semibold">
                  <th className="p-4">Data</th>
                  <th className="p-4">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-normal">
                <tr>
                  <td className="p-4 font-semibold text-slate-800">Case study URL</td>
                  <td className="p-4">To fetch and analyze your case study content</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">Goal and experience level</td>
                  <td className="p-4">To calibrate feedback against the right criteria</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">Email address</td>
                  <td className="p-4">To notify you when email delivery launches and to send your saved report</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">Usage data</td>
                  <td className="p-4">To improve product performance and fix bugs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            We do not sell your data. We do not use your data for advertising. We do not share your data with third parties except as described in Section 4.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mt-6 uppercase tracking-wider">4. Third-Party Services</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            To deliver the Vurdict experience, we use the following services:
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            <strong className="text-slate-800">Jina Reader</strong> converts your submitted URL into readable text for analysis. Your URL is passed to Jina’s servers for this purpose. Jina’s privacy policy applies to this processing.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            <strong className="text-slate-800">Google Gemini API</strong> powers the AI evaluation of your case study. The text content of your case study is sent to Google’s API for analysis. Google’s privacy policy applies. We do not use your data to train AI models.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            <strong className="text-slate-800">Vercel</strong> hosts the Vurdict application and processes web traffic. Vercel’s privacy policy applies.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal pt-2">
            None of these services receive your email address.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mt-6 uppercase tracking-wider">5. Data Retention</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            <strong className="text-slate-800">Case study URLs and analysis inputs</strong> are not stored beyond your session. Once your report is generated, we do not retain the content of your case study.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            <strong className="text-slate-800">Email addresses</strong> collected for the waitlist are retained until you unsubscribe or request deletion.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            <strong className="text-slate-800">Usage analytics</strong> are retained in aggregate, anonymized form.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mt-6 uppercase tracking-wider">6. Your Rights</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 font-normal">
            <li>Request a copy of any personal data we hold about you</li>
            <li>Request deletion of your email address from our waitlist</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed font-normal pt-2">
            To exercise any of these rights, email us at{" "}
            <a href="mailto:vurdict@gmail.com" className="text-brand-900 font-medium hover:underline">
              vurdict@gmail.com
            </a>{" "}
            and we will respond within 7 business days.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mt-6 uppercase tracking-wider">7. Children</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Vurdict is not directed at children under the age of 13. We do not knowingly collect data from children. If you believe a child has submitted information to us, contact us at{" "}
            <a href="mailto:vurdict@gmail.com" className="text-brand-900 font-medium hover:underline">
              vurdict@gmail.com
            </a>{" "}
            and we will delete it promptly.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mt-6 uppercase tracking-wider">8. Changes to This Policy</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            We may update this policy as the product evolves. When we do, we will update the “Last Updated” date at the top of this page. Continued use of Vurdict after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-4 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">9. Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            For any privacy concerns or data requests:{" "}
            <a href="mailto:vurdict@gmail.com" className="text-brand-900 font-semibold hover:underline">
              vurdict@gmail.com
            </a>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 bg-white text-slate-500 z-10 shrink-0">
        <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center">
              <Logo size="small" />
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              &copy; 2026 Vurdict. The Reviewer's Perspective.
            </p>
          </div>
          <div className="flex gap-6 text-xs font-semibold text-slate-500">
            <Link to="/privacy" className="hover:text-brand-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-900 transition-colors">Terms of Use</Link>
            <Link to="/support" className="hover:text-brand-900 transition-colors">Support Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
