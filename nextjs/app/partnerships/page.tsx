import React from 'react';
import Link from 'next/link';
import { Handshake, Building, GraduationCap, Users, ArrowRight, Mail } from 'lucide-react';

export default function PartnershipsPage() {
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
            Partner with Vurdict
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium max-w-xl mx-auto">
            Help your community design better portfolios.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Why Partner With Us</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "For Design Communities", desc: "Give your members access to professional-grade portfolio analysis that helps them stand out in job applications and freelance pitches.", icon: Users },
              { title: "For Design Schools", desc: "Integrate Vurdict into your curriculum so students can self-evaluate their case studies before portfolio reviews.", icon: GraduationCap },
              { title: "Content Partners", desc: "Design blogs, newsletters, or YouTube channels that feature Vurdict as a resource for their audience. A simple link swap that helps both sides.", icon: Building },
              { title: "Event / Workshop Partners", desc: "Design meetups or conferences get a Vurdict portfolio review station. Attendees get real feedback, and you offer something unique.", icon: Handshake },
              { title: "For Design Tools", desc: "Let your users run portfolio analysis without leaving your site. A simple integration that makes your platform more useful to designers.", icon: Building },
              { title: "Co-Branded Reports", desc: "Add your logo to Vurdict reports so when your community gets feedback, your brand is part of the experience.", icon: Handshake }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-navy-900/40 border border-navy-850 p-5 rounded-2xl space-y-3 flex flex-col items-center text-center group hover:border-brand-indigo/30 hover:bg-navy-900/60 transition-all duration-200">
                  <Icon size={18} className="text-brand-indigo transition-all duration-200 group-hover:scale-110" />
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
            <Handshake size={14} />
            <span>Let's Build Together</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-semibold">
            Whether you run a design community, teach at a school, or build tools for designers — we would love to explore how Vurdict can support you.
          </p>
          <a
            href="mailto:hellovurdict@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 px-6 py-3.5 text-sm font-semibold transition-all shadow-md hover:-translate-y-0.5"
          >
            <Mail size={16} />
            <span>Get in Touch</span>
            <ArrowRight size={14} />
          </a>
        </section>

      </div>
    </div>
  );
}
