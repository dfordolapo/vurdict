import { useState } from 'react'
import { Mail, User, CheckCircle, Loader2 } from 'lucide-react'

const apiUrl = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.port === '5173' ? 'http://localhost:3001' : '')

export default function WaitlistForm({ feature = 'this feature', placeholder = 'you@example.com', buttonText = 'Notify Me' }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [alreadyJoined, setAlreadyJoined] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    if (!email.trim() || !isValidEmail(email.trim())) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${apiUrl}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), feature })
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      if (data.message === "You're already on the list.") {
        setAlreadyJoined(true)
      }
    } catch (err) {
      console.log('Waitlist signup error:', err.message)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
        <CheckCircle size={14} />
        <span>{alreadyJoined ? "You're already on the list." : "You're in! We'll be in touch."}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-full relative">
      <div className="relative w-full">
        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setError('') }}
          placeholder="Your Name"
          className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 transition-all"
        />
      </div>
      <div className="relative w-full">
        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
          placeholder={placeholder}
          className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2.5 text-xs font-semibold rounded-xl bg-brand-900 text-white hover:bg-brand-800 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : buttonText}
      </button>
      {error && <span className="text-[10px] text-red-500 -mt-1.5">{error}</span>}
    </form>
  )
}
