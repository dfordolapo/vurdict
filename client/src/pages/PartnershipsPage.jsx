import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Handshake, Building, GraduationCap, Users, ArrowRight, Mail } from 'lucide-react';

export default function PartnershipsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between select-none font-sans relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-20 text-center space-y-8 select-text">
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Partner with Vurdict</h1>
          <p className="text-sm text-slate-500 leading-relaxed font-normal max-w-xl mx-auto">
            Help your community design better portfolios.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mt-6 uppercase tracking-wider">Why Partner With Us</h2>
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
                <div key={idx} className="bg-slate-50/50 border border-slate-100/70 p-5 rounded-2xl space-y-3 flex flex-col items-center text-center group hover:bg-slate-50 hover:border-slate-200 transition-all">
                  <Icon size={18} className="text-blue-600 transition-all duration-200 group-hover:scale-110" />
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 font-normal leading-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-5 bg-blue-50/30 border border-blue-100/50 p-6 rounded-3xl mt-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-700 uppercase">
            <Handshake size={16} />
            <span>Let's Build Together</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Whether you run a design community, teach at a school, or build tools for designers — we would love to explore how Vurdict can support you.
          </p>
          <a
            href="mailto:hellovurdict@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-900 hover:bg-brand-800 text-white px-6 py-3.5 text-sm font-normal transition-all shadow-md hover:-translate-y-0.5 cursor-pointer mx-auto"
          >
            <Mail size={16} />
            <span>Get in Touch</span>
            <ArrowRight size={14} />
          </a>
        </section>

      </main>

      <Footer />
    </div>
  );
}
