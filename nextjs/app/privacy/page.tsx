import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-navy-950 bg-grid-pattern py-12 md:py-20 select-text">
      <div className="mx-auto max-w-3xl px-6 space-y-8 text-center">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 border-b border-navy-800/60 pb-5">
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors group"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Effective Date: June 8, 2026 &bull; Last Updated: June 8, 2026
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">1. Who We Are</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Vurdict is an AI-powered portfolio review tool that helps product designers get structured, goal-aware feedback on their case studies. We are based in Nigeria and operate at{" "}
            <a href="https://vurdict.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-medium hover:underline">
              vurdict.vercel.app
            </a>.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            For privacy-related questions, contact us at:{" "}
            <a href="mailto:vurdict@gmail.com" className="text-indigo-400 font-medium hover:underline">
              vurdict@gmail.com
            </a>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">2. What We Collect</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-semibold">When you analyze a case study:</p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
            <li>The URL you submit for analysis</li>
            <li>Your selected goal (Get Hired, Win Freelance Clients, Improve Portfolio Quality)</li>
            <li>Your selected experience level (Junior, Mid-Level, Senior)</li>
          </ul>

          <p className="text-sm text-slate-300 leading-relaxed font-semibold pt-2">When you join the waitlist or save a report:</p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
            <li>Your email address</li>
          </ul>

          <p className="text-sm text-slate-300 leading-relaxed font-semibold pt-2">Automatically:</p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
            <li>Basic usage data (pages visited, time on site) via Vercel Analytics</li>
            <li>Your device type and browser (for performance optimization)</li>
          </ul>

          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            We do not collect your name, location, payment information, or any information beyond what is listed above.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">3. How We Use Your Data</h2>
          <div className="overflow-x-auto border border-navy-800 rounded-xl bg-navy-900/10">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-navy-900 border-b border-navy-800 text-white font-semibold">
                  <th className="p-4 text-center">Data</th>
                  <th className="p-4 text-center">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-850 text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-white">Case study URL</td>
                  <td className="p-4">To fetch and analyze your case study content</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Goal and experience level</td>
                  <td className="p-4">To calibrate feedback against the right criteria</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Email address</td>
                  <td className="p-4">To notify you when email delivery launches and to send your saved report</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Usage data</td>
                  <td className="p-4">To improve product performance and fix bugs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            We do not sell your data. We do not use your data for advertising. We do not share your data with third parties except as described in Section 4.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">4. Third-Party Services</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            To deliver the Vurdict experience, we use the following services:
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Jina Reader</strong> converts your submitted URL into readable text for analysis. Your URL is passed to Jina’s servers for this purpose. Jina’s privacy policy applies to this processing.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Google Gemini API</strong> powers the AI evaluation of your case study. The text content of your case study is sent to Google’s API for analysis. Google’s privacy policy applies. We do not use your data to train AI models.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Vercel</strong> hosts the Vurdict application and processes web traffic. Vercel’s privacy policy applies.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            None of these services receive your email address.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">5. Data Retention</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Case study URLs and analysis inputs</strong> are not stored beyond your session. Once your report is generated, we do not retain the content of your case study.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Email addresses</strong> collected for the waitlist are retained until you unsubscribe or request deletion.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Usage analytics</strong> are retained in aggregate, anonymized form.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">6. Your Rights</h2>
          <p className="text-sm text-slate-300 leading-relaxed">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
            <li>Request a copy of any personal data we hold about you</li>
            <li>Request deletion of your email address from our waitlist</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            To exercise any of these rights, email us at{" "}
            <a href="mailto:vurdict@gmail.com" className="text-indigo-400 font-medium hover:underline">
              vurdict@gmail.com
            </a>{" "}
            and we will respond within 7 business days.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">7. Children</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Vurdict is not directed at children under the age of 13. We do not knowingly collect data from children. If you believe a child has submitted information to us, contact us at{" "}
            <a href="mailto:vurdict@gmail.com" className="text-indigo-400 font-medium hover:underline">
              vurdict@gmail.com
            </a>{" "}
            and we will delete it promptly.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">8. Changes to This Policy</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We may update this policy as the product evolves. When we do, we will update the “Last Updated” date at the top of this page. Continued use of Vurdict after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-4 border-t border-navy-800/60 pt-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">9. Contact</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            For any privacy concerns or data requests:{" "}
            <a href="mailto:vurdict@gmail.com" className="text-indigo-400 font-semibold hover:underline">
              vurdict@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
