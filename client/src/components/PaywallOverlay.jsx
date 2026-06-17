import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, CheckCircle, AlertTriangle, FileText, Target, ChevronRight, X } from 'lucide-react';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
const AMOUNT_KOBO = 250000; // ₦2,500 in kobo

function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();
    const existing = document.getElementById('paystack-sdk');
    if (existing) {
      existing.addEventListener('load', resolve);
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.id = 'paystack-sdk';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function PaywallOverlay({ onUnlock }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sdkError, setSdkError] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    loadPaystackScript()
      .then(() => setSdkReady(true))
      .catch(() => setSdkError(true));
  }, []);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handlePay = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address for your receipt.');
      return;
    }
    setEmailError('');

    if (!PAYSTACK_PUBLIC_KEY) {
      // Dev mode: no key set — unlock immediately so devs can test UI
      console.warn('[Vurdict] VITE_PAYSTACK_PUBLIC_KEY not set. Unlocking in dev mode.');
      onUnlock();
      return;
    }

    if (!sdkReady || !window.PaystackPop) {
      setSdkError(true);
      return;
    }

    setLoading(true);

    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: AMOUNT_KOBO,
        currency: 'NGN',
        metadata: {
          custom_fields: [
            { display_name: 'Product', variable_name: 'product', value: 'Vurdict — Full Dimension Report' }
          ]
        },
        onSuccess: () => {
          setLoading(false);
          onUnlock();
        },
        onCancel: () => {
          setLoading(false);
        }
      });
      handler.openIframe();
    } catch (err) {
      console.error('[Vurdict] Paystack error:', err);
      setLoading(false);
      setSdkError(true);
    }
  };

  const features = [
    { icon: FileText, label: '"Why this score?" — contextual explanation tailored to your experience level', color: 'text-blue-500' },
    { icon: CheckCircle, label: '"What\'s Working" — specific strengths found in your portfolio', color: 'text-emerald-500' },
    { icon: AlertTriangle, label: '"Where to Improve" — targeted fixes for each dimension', color: 'text-amber-500' },
    { icon: Sparkles, label: '"Top Recommendation" — step-by-step actionable playbook', color: 'text-violet-500' },
    { icon: Target, label: 'Repeatable across all 6 evaluation dimensions', color: 'text-rose-500' },
  ];

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center py-6 px-4 overflow-y-auto">
      {/* Frosted glass backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.72) 0%, rgba(248,250,252,0.92) 100%)' }}
      />

      {/* Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-fade-in-up">

        {/* Navy header — compact rectangle */}
        <div className="bg-brand-900 px-6 py-5 relative overflow-hidden">
          {/* Subtle spotlight */}
          <div className="absolute w-48 h-48 rounded-full bg-sky-500/10 blur-[60px] -top-8 -right-8 pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="h-8 w-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              <Lock size={15} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white leading-tight">
                Unlock the Full Dimension Report
              </h2>
            </div>
          </div>
        </div>

        <div className="px-7 pb-8 pt-6 space-y-6">

          {/* Subtitle below wave */}
          <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
            The overview is free. Pay once to access the detailed breakdown for all 6 dimensions — actionable, specific, and calibrated to your goals.
          </p>

          {/* Feature list */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-100 p-5 space-y-3.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">What you unlock</span>
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <f.icon size={13} className={`${f.color} shrink-0 mt-0.5`} />
                <span className="text-[11px] text-slate-700 font-normal leading-relaxed">{f.label}</span>
              </div>
            ))}
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label htmlFor="paywall-email" className="text-[10px] font-semibold text-slate-600 uppercase tracking-wide block">
              Your email — for your receipt
            </label>
            <input
              id="paywall-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handlePay()}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={loading}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm font-normal text-slate-900 placeholder-slate-300 bg-white transition-all outline-none focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 disabled:opacity-60 ${
                emailError ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
              }`}
            />
            {emailError && (
              <p className="text-[10px] text-rose-600 font-medium">{emailError}</p>
            )}
          </div>

          {/* SDK error */}
          {sdkError && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-2.5 text-[11px] text-rose-700 font-medium">
              Payment SDK failed to load. Please refresh the page and try again.
            </div>
          )}

          {/* CTA */}
          <div className="space-y-3">
            <button
              onClick={handlePay}
              disabled={loading || sdkError}
              id="paywall-cta-btn"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-brand-900 hover:bg-blue-950 text-white text-sm font-semibold transition-all shadow-lg shadow-brand-900/20 hover:shadow-brand-900/30 hover:scale-[1.01] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Opening checkout…</span>
                </>
              ) : (
                <>
                  <Lock size={14} />
                  <span>Unlock Full Report — ₦2,500</span>
                  <ChevronRight size={14} className="opacity-70" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 pt-1">
              <span className="text-[9px] text-slate-400 font-medium flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-slate-400">
                  <path d="M8 1L10.163 5.387L15 6.11L11.5 9.525L12.326 14.343L8 12.062L3.674 14.343L4.5 9.525L1 6.11L5.837 5.387L8 1Z" fill="currentColor" opacity="0.5"/>
                </svg>
                Secured by Paystack
              </span>
              <span className="text-[9px] text-slate-300">•</span>
              <span className="text-[9px] text-slate-400 font-medium">One-time payment</span>
              <span className="text-[9px] text-slate-300">•</span>
              <span className="text-[9px] text-slate-400 font-medium">No subscription</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
