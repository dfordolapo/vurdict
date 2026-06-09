import React from 'react';
import Link from 'next/link';
import { Heart, Brain, Cloud, Terminal, HeartHandshake } from 'lucide-react';

export default function SupportPage() {
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
          <div className="w-full max-w-[200px] mb-4 mt-6 mx-auto">
            <img src="/assets/support_illustration.png" alt="Support Vurdict illustration" className="w-full h-auto object-contain select-none" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
            Support Vurdict
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            If Vurdict has helped you understand your portfolio better, consider supporting us. We are a small team keeping this free and accessible for every designer trying to break in or level up, and every contribution helps us do that.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">What Your Support Covers</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "AI evaluation costs", desc: "Every analysis runs through the Gemini API, which has a cost per request.", icon: Brain },
              { title: "Infrastructure", desc: "Hosting, URL reading services, and keeping the platform fast and reliable.", icon: Cloud },
              { title: "Development", desc: "New features like Co-Pilot, email delivery, and expanded role support.", icon: Terminal },
              { title: "Keeping it free", desc: "Ensuring a junior designer in Lagos has access to the same quality feedback as one in London.", icon: HeartHandshake }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-navy-900/40 border border-navy-850 p-5 rounded-2xl space-y-3 flex flex-col items-center text-center group hover:border-brand-indigo/30 hover:bg-navy-900/60 transition-all duration-200">
                  <div className="w-fit mx-auto rounded-xl p-2 bg-navy-950 border border-navy-800 text-brand-indigo transition-all duration-200 group-hover:border-brand-indigo/30">
                    <Icon size={16} className="text-brand-indigo transition-all duration-200 group-hover:scale-110" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-5 bg-indigo-950/30 border border-indigo-900/50 p-6 rounded-2xl mt-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-400 uppercase">
            <Heart size={14} className="text-indigo-400 fill-indigo-400/10" />
            <span>How to Support Us</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-semibold">
            You can make a one-time contribution of any amount via Paystack. No account required.
          </p>
          <a
            href="https://paystack.com/pay/support-vurdict" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 px-6 py-3.5 text-sm font-semibold transition-all shadow-md hover:-translate-y-0.5"
          >
            <span>Support Vurdict on Paystack →</span>
          </a>
        </section>

        <section className="space-y-4 border-t border-navy-800/60 pt-8">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">For Investors and Partnerships</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Vurdict is early but growing. If you are interested in investing, partnering, or exploring what this product could become at scale, we would love to hear from you.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Reach out at:{" "}
            <a href="mailto:hellovurdict@gmail.com" className="text-indigo-400 font-semibold hover:underline">
              hellovurdict@gmail.com
            </a>
          </p>
        </section>

        <section className="space-y-4 border-t border-navy-800/60 pt-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Thank You</h2>
          <p className="text-sm text-slate-400 leading-relaxed italic">
            Whether you contribute financially or simply share Vurdict with a designer who needs honest feedback, you are part of why this exists.
          </p>
        </section>
      </div>
    </div>
  );
}
