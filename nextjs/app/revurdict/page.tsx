'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Send, MessageSquare, Bot, MessageCircle, Compass, Radio, Rocket } from 'lucide-react';
const EXAMPLE_MESSAGES = [
  {
    role: 'user',
    text: 'Why did I score low on Impact Evidence?',
  },
  {
    role: 'assistant',
    text: 'Your case study described the process clearly, but measurable outcomes were not visible in the submitted content. Consider adding metrics, business impact, or user outcomes to strengthen this section.',
  },
  {
    role: 'user',
    text: 'What should I fix first?',
  },
  {
    role: 'assistant',
    text: 'Based on your report, I would prioritize:\n\n1. Add measurable outcomes — Include conversion rates, time savings, or satisfaction scores.\n2. Strengthen problem framing — Define the "before" state more clearly.\n3. Improve positioning clarity — Make your specific role and impact unmistakable.',
  },
];

export default function ReVurdictPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(EXAMPLE_MESSAGES);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setShowPlaceholder(true);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 bg-navy-950 bg-grid-pattern flex flex-col">
      {/* Hero */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white tracking-tight">
                    <span className="text-sky-400">Re:</span>Vurdict
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  Coming Soon
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-2">
                Your verdict doesn't have to be the final word.
              </h1>
              <p className="text-slate-400 font-medium text-xs md:text-sm leading-relaxed max-w-lg">
                Re:Vurdict is a conversational AI portfolio coach that helps you improve your case studies, 
                positioning, and job readiness through chat. Ask questions, challenge feedback, and dig deeper 
                into your scores.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Link
                href="/analyze"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet hover:from-brand-indigo hover:to-brand-indigo/90 px-4 py-2 text-[11px] font-bold text-white shadow-lg shadow-brand-indigo/20 transition-all duration-200 hover:scale-[1.01] group"
              >
                <span>Run a Vurdict Analysis</span>
                <ArrowRight size={12} className="transition-all duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href="mailto:hellovurdict@gmail.com?subject=Re:Vurdict Waitlist"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold text-slate-400 border border-navy-800 hover:border-brand-indigo/40 hover:text-white hover:bg-navy-900/60 transition-all"
              >
                  <Rocket size={12} className="text-sky-400" />
                <span>Join the Waitlist</span>
              </a>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="rounded-2xl border border-navy-800/80 bg-navy-900/40 shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="px-5 py-4 border-b border-navy-800 bg-navy-900/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center">
                  <Bot size={14} className="text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white">Re:Vurdict Coach</span>
                  <span className="text-[10px] text-slate-500 ml-2 font-semibold">Preview</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>

            {/* Messages */}
            <div className="px-5 py-6 space-y-5 max-h-[420px] overflow-y-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-brand-indigo to-brand-violet text-white rounded-tr-md'
                        : 'bg-navy-950/80 border border-navy-800 text-slate-300 rounded-tl-md'
                    }`}
                  >
                    {msg.text.split('\n').map((line, i) => {
                      const parts = line.split(/(\*\*[^*]+\*\*)/g);
                      const rendered = parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      });
                      if (line.match(/^\d+\./)) {
                        return (
                          <p key={i} className="text-slate-300 ml-2 mb-0.5 font-medium">
                            {rendered}
                          </p>
                        );
                      }
                      return (
                        <p key={i} className="mb-1 last:mb-0 font-medium">
                          {rendered}
                        </p>
                      );
                    })}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-[10px] font-bold">U</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Coming Soon Placeholder Response */}
              {showPlaceholder && (
                <div className="flex gap-3 justify-start animate-fade-in-up">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="max-w-[75%] rounded-2xl px-5 py-4 bg-navy-950/80 border border-brand-indigo/30 text-slate-300 rounded-tl-md">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare size={13} className="text-sky-400" />
                      <span className="text-xs font-bold text-brand-indigo">Re:Vurdict</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium mb-3">
                      It's coming soon. While you wait, run a full Vurdict analysis to see where your portfolio stands today.
                    </p>
                    <Link
                      href="/analyze"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo hover:text-white transition-colors group"
                    >
                      <span>Run a Vurdict Analysis</span>
                      <ArrowRight size={12} className="transition-all duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="px-5 py-4 border-t border-navy-800 bg-navy-900/60">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Re:Vurdict anything..."
                  className="flex-1 bg-navy-950/80 border border-navy-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-indigo/40 focus:bg-navy-950 transition-all font-medium"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-gradient-to-r from-brand-indigo to-brand-violet text-white p-2.5 rounded-xl hover:from-brand-indigo hover:to-brand-indigo/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send size={14} className="text-white" />
                </button>
              </div>
              <p className="text-[10px] text-slate-600 mt-2 text-center font-semibold">
                This is a preview — responses are not yet powered by AI
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid sm:grid-cols-3 gap-3 mt-8">
            {[
              { icon: MessageCircle, title: 'Chat About Your Report', desc: 'Ask follow-ups about scores, dimensions, and recommendations from your Vurdict analysis.' },
              { icon: Compass, title: 'Career Coaching', desc: 'Get portfolio strategy advice, interview prep tips, and hiring manager perspective.' },
              { icon: Radio, title: 'Real-Time Guidance', desc: 'Upload screenshots, discuss case studies, and challenge feedback in natural conversation.' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="glass-panel-interactive rounded-2xl p-5 text-left">
                  <Icon size={15} className="text-sky-400 mb-2" />
                  <h3 className="text-xs font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Ecosystem CTA */}
          <div className="mt-12 bg-gradient-to-br from-brand-indigo/5 to-brand-violet/5 border border-brand-indigo/10 rounded-2xl p-6 text-center">
            <h2 className="text-sm font-extrabold text-white mb-2">Two Products, One Ecosystem</h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed mb-4 font-medium">
              <span className="font-bold text-white">Vurdict</span> delivers the verdict. <span className="font-bold text-white">Re:Vurdict</span> continues the conversation. 
              Together, they form a complete portfolio improvement system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/analyze"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet hover:from-brand-indigo hover:to-brand-indigo/90 px-4 py-2 text-[11px] font-bold text-white shadow-lg shadow-brand-indigo/20 transition-all duration-200 hover:scale-[1.01] group"
              >
                <span>Get Your Vurdict Report</span>
                <ArrowRight size={12} className="transition-all duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href="mailto:hellovurdict@gmail.com?subject=Re:Vurdict Waitlist"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold text-slate-400 border border-navy-800 hover:border-brand-indigo/40 hover:text-white hover:bg-navy-900/60 transition-all"
              >
                <Rocket size={12} className="text-sky-400" />
                <span>Join Re:Vurdict Waitlist</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
