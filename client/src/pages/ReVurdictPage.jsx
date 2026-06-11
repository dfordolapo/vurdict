import React, { useState } from 'react'
import { Send, MessageSquare, Bot, MessageCircle, GraduationCap, Radio, Rocket } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WaitlistForm from '../components/WaitlistForm'

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
  const [devMode] = useState(() => localStorage.getItem('_vurdict_dev') || new URLSearchParams(window.location.search).has('dev'))
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(EXAMPLE_MESSAGES)
  const [loading, setLoading] = useState(false)
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    setInput('')

    if (!devMode) {
      setShowPlaceholder(true)
      return
    }

    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setLoading(true)

    try {
      const res = await fetch('/api/revurdict-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply }])
      }
    } catch (err) {
      console.error('Re:Vurdict chat error:', err)
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased flex flex-col">
      <Navbar />

      <main className="flex-1">
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
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm w-full md:w-72 space-y-3">
                <div>
                  <h3 className="text-xs font-semibold text-slate-900">Join the Re:Vurdict Waitlist</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                    Be the first to chat with your AI portfolio coach.
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {['Get instant feedback on any case study question', 'Deep-dive into your scores with follow-up chats', 'Early access to new AI coaching features'].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-[10px] text-slate-600">
                      <span className="text-sky-500 mt-0.5 shrink-0">&#10003;</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <WaitlistForm feature="Re:Vurdict" buttonText="Join the Waitlist" placeholder="your@email.com" />
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
                    <span className="text-[10px] text-slate-400 ml-2 font-medium">{devMode ? 'Live' : 'Preview'}</span>
                  </div>
                </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${devMode ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' : 'text-amber-600 bg-amber-50 border border-amber-200'}`}>
                    {devMode ? 'Live' : 'Coming Soon'}
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

                {showPlaceholder && !devMode && (
                  <div className="flex gap-3 justify-start animate-fade-in-up">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={10} className="text-white" />
                    </div>
                    <div className="max-w-[75%] rounded-2xl px-3.5 py-2.5 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/80 text-slate-700 rounded-tl-md">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare size={11} className="text-sky-500" />
                        <span className="text-[11px] font-bold text-sky-600">Re:Vurdict</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                        It's coming soon. Join the waitlist above to get early access.
                      </p>
                    </div>
                  </div>
                )}
                {loading && devMode && (
                  <div className="flex gap-3 justify-start animate-fade-in-up">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={10} className="text-white" />
                    </div>
                    <div className="max-w-[75%] rounded-2xl px-3.5 py-2.5 bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-md">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
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
                  {devMode ? 'AI-powered portfolio coaching — ask anything about your case studies' : 'This is a preview — responses are not yet powered by AI'}
                </p>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {[
                { icon: MessageCircle, title: 'Chat About Your Report', desc: 'Ask follow-ups about scores, dimensions, and recommendations from your Vurdict analysis.' },
                { icon: GraduationCap, title: 'Career Coaching', desc: 'Get portfolio strategy advice, interview prep tips, and hiring manager perspective.' },
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
            <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100/80 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute w-72 h-72 rounded-full bg-sky-200/20 blur-[80px] -top-20 -right-20 pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-full max-w-[200px] shrink-0">
                  <svg viewBox="0 0 200 160" fill="none" className="w-full h-auto">
                    <defs>
                      <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#1e3a5f" />
                        <stop offset="100%" stopColor="#172554" />
                      </linearGradient>
                      <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>
                    <circle cx="75" cy="80" r="48" fill="url(#vg)" opacity="0.12" />
                    <circle cx="125" cy="80" r="48" fill="url(#rg)" opacity="0.12" />
                    <circle cx="75" cy="80" r="32" stroke="url(#vg)" strokeWidth="2.5" fill="none" />
                    <circle cx="125" cy="80" r="32" stroke="url(#rg)" strokeWidth="2.5" fill="none" />
                    <text x="67" y="85" fontSize="13" fontWeight="700" fill="#172554" fontFamily="system-ui">V</text>
                    <text x="115" y="85" fontSize="13" fontWeight="700" fill="#0ea5e9" fontFamily="system-ui">R</text>
                    <line x1="100" y1="50" x2="100" y2="110" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="100" cy="80" r="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                    <text x="96" y="84" fontSize="9" fill="#64748b" fontFamily="system-ui">+</text>
                    <path d="M100 88 Q100 120 60 130" stroke="#172554" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.4" />
                    <path d="M100 88 Q100 120 140 130" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.4" />
                    <circle cx="60" cy="134" r="4" fill="#172554" opacity="0.6" />
                    <circle cx="140" cy="134" r="4" fill="#0ea5e9" opacity="0.6" />
                  </svg>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-sm font-semibold text-slate-900 mb-1">Two Products, One Ecosystem</h2>
                  <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-5 font-normal">
                    <span className="font-semibold text-slate-700">Vurdict</span> delivers the verdict. <span className="font-semibold text-slate-700">Re:Vurdict</span> continues the conversation. 
                    Together, they form a complete portfolio improvement system.
                  </p>
                  <div className="max-w-xs">
                    <div className="bg-white/80 border border-sky-100/60 rounded-xl p-5 text-left space-y-3 shadow-sm">
                      <div>
                        <h3 className="text-[11px] font-semibold text-slate-900">Join the Re:Vurdict Waitlist</h3>
                        <p className="text-[9px] text-slate-500 leading-relaxed mt-0.5">Be the first to experience AI-powered portfolio coaching.</p>
                      </div>
                      <ul className="space-y-1">
                        {['Chat with your portfolio scores', 'Get rewrite suggestions for weak spots', 'Early adopter perks'].map((benefit, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[9px] text-slate-600">
                            <span className="text-sky-500 shrink-0">&#10003;</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <WaitlistForm feature="Re:Vurdict" buttonText="Join the Waitlist" placeholder="your@email.com" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
