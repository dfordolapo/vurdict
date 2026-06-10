import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Send, MessageSquare, Bot, MessageCircle, Compass, Radio, Rocket } from 'lucide-react'
import Logo from '../components/Logo'

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
    text: 'Based on your report, I would prioritize:\n\n1. **Add measurable outcomes** — Include conversion rates, time savings, or satisfaction scores.\n2. **Strengthen problem framing** — Define the "before" state more clearly.\n3. **Improve positioning clarity** — Make your specific role and impact unmistakable.',
  },
]

export default function ReVurdictPage() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(EXAMPLE_MESSAGES)
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    setShowPlaceholder(true)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo size="normal" />
          </Link>
          <Link
            to="/analyze"
            className="btn-brand flex items-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-medium group whitespace-nowrap shrink-0"
          >
            <span>Analyze Portfolio</span>
            <div className="rounded-md p-0.5 transition-all duration-200 group-hover:bg-white/20">
              <ArrowRight size={14} className="transition-all duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="py-12 md:py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 tracking-tight">
                  <span className="text-sky-500">Re:</span>Vurdict
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700">
                    Coming Soon
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight mb-2">
                  Your verdict doesn't have to be the final word.
                </h1>
                <p className="text-slate-500 font-normal text-xs md:text-sm leading-relaxed max-w-lg">
                  Re:Vurdict is a conversational AI portfolio coach that helps you improve your case studies, 
                  positioning, and job readiness through chat. Ask questions, challenge feedback, and dig deeper 
                  into your scores.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Link
                  to="/analyze"
                  className="btn-brand flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-medium group whitespace-nowrap"
                >
                  <span>Run a Vurdict Analysis</span>
                  <ArrowRight size={12} className="transition-all duration-200 group-hover:translate-x-1" />
                </Link>
                <a
                  href="mailto:hellovurdict@gmail.com?subject=Re:Vurdict Waitlist"
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-medium text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all whitespace-nowrap"
                >
                  <Rocket size={12} className="text-sky-500" />
                  <span>Join the Waitlist</span>
                </a>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="rounded-2xl border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden bg-white">
              {/* Chat Header */}
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900">Re:Vurdict Coach</span>
                    <span className="text-[10px] text-slate-400 ml-2 font-medium">Preview</span>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </div>

              {/* Messages */}
              <div className="px-4 py-4 space-y-4 max-h-[400px] overflow-y-auto">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot size={10} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[11px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-brand-900 text-white rounded-tr-md'
                          : 'bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-md'
                      }`}
                    >
                      {msg.text.split('\n').map((line, i) => {
                        const parts = line.split(/(\*\*[^*]+\*\*)/g);
                        const rendered = parts.map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        });
                        if (line.match(/^\d+\./)) {
                          return (
                            <p key={i} className="text-slate-600 ml-2 mb-0.5 font-normal">
                              {rendered}
                            </p>
                          )
                        }
                        return (
                          <p key={i} className="mb-1 last:mb-0 font-normal">
                            {rendered}
                          </p>
                        )
                      })}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-brand-900 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-white text-[9px] font-bold">U</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Coming Soon Placeholder Response */}
                {showPlaceholder && (
                  <div className="flex gap-3 justify-start animate-fade-in-up">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={10} className="text-white" />
                    </div>
                    <div className="max-w-[75%] rounded-2xl px-3.5 py-2.5 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/80 text-slate-700 rounded-tl-md">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare size={11} className="text-sky-500" />
                        <span className="text-[11px] font-bold text-sky-600">Re:Vurdict</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-normal mb-2">
                        It's coming soon. While you wait, run a full Vurdict analysis to see where your portfolio stands today.
                      </p>
                      <Link
                        to="/analyze"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-sky-600 hover:text-sky-700 transition-colors group"
                      >
                        <span>Run a Vurdict Analysis</span>
                        <ArrowRight size={11} className="transition-all duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                )}

            </div>

              {/* Chat Input */}
              <div className="px-5 py-4 border-t border-slate-100 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Re:Vurdict anything..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-300 focus:bg-white transition-all"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="bg-brand-900 text-white p-2.5 rounded-xl hover:bg-brand-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send size={14} className="text-white" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-center font-medium">
                  This is a preview — responses are not yet powered by AI
                </p>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {[
                { icon: MessageCircle, title: 'Chat About Your Report', desc: 'Ask follow-ups about scores, dimensions, and recommendations from your Vurdict analysis.' },
                { icon: Compass, title: 'Career Coaching', desc: 'Get portfolio strategy advice, interview prep tips, and hiring manager perspective.' },
                { icon: Radio, title: 'Real-Time Guidance', desc: 'Upload screenshots, discuss case studies, and challenge feedback in natural conversation.' },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100/80 text-left">
                    <Icon size={18} className="text-sky-500 mb-3" />
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* Ecosystem CTA */}
            <div className="mt-12 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/80 rounded-2xl p-6 text-center">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">Two Products, One Ecosystem</h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed mb-4 font-normal">
                <span className="font-semibold text-slate-700">Vurdict</span> delivers the verdict. <span className="font-semibold text-slate-700">Re:Vurdict</span> continues the conversation. 
                Together, they form a complete portfolio improvement system.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/analyze"
                  className="btn-brand flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[11px] font-medium group"
                >
                  <span>Get Your Vurdict Report</span>
                  <ArrowRight size={12} className="transition-all duration-200 group-hover:translate-x-1" />
                </Link>
                <a
                  href="mailto:hellovurdict@gmail.com?subject=Re:Vurdict Waitlist"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[11px] font-medium text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all"
                >
                  <Rocket size={12} className="text-sky-500" />
                  <span>Join Re:Vurdict Waitlist</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 bg-white text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Logo size="small" />
            <p className="text-xs text-slate-400 font-medium mt-1">
              &copy; 2026 Vurdict. The Reviewer's Perspective.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-6 text-xs font-normal text-slate-500">
            <Link to="/privacy" className="hover:text-brand-900 transition-colors whitespace-nowrap">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-900 transition-colors whitespace-nowrap">Terms of Use</Link>
            <Link to="/support" className="hover:text-brand-900 transition-colors whitespace-nowrap">Support Us</Link>
            <Link to="/revurdict" className="text-indigo-500 hover:text-indigo-700 transition-colors font-semibold whitespace-nowrap">Re:Vurdict</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
