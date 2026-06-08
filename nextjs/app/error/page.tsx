'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAnalysis } from '../../hooks/use-analysis';
import { AlertTriangle, ArrowRight, RefreshCw, HelpCircle, CheckCircle } from 'lucide-react';

export default function ErrorPage() {
  const router = useRouter();
  const { state, resetAnalysis } = useAnalysis();

  const handleRetry = () => {
    resetAnalysis();
    router.push('/analyze');
  };

  return (
    <div className="flex-1 bg-navy-950 bg-dot-pattern flex items-center py-16">
      <div className="mx-auto max-w-xl px-4 sm:px-6 text-center space-y-8">
        
        {/* Error Icon */}
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/30 shadow-lg shadow-rose-500/10 animate-bounce group hover:bg-rose-500/20 hover:border-rose-500/50 hover:shadow-rose-500/20 transition-all">
          <AlertTriangle className="h-8 w-8 text-rose-500 transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Portfolio Audit Failed
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
            {state.error || "We encountered an issue while retrieving or parsing your portfolio content. This is usually caused by network timeouts, page blocks, or DNS issues."}
          </p>
        </div>

        {/* Troubleshooting Checklist */}
        <div className="glass-panel rounded-2xl p-5 text-left space-y-4 border-navy-800">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-navy-850 pb-2">
            Troubleshooting Tips
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
            <li className="flex gap-2">
              <span className="text-brand-indigo shrink-0">1.</span>
              <span>Verify that your portfolio URL is public and loads correctly in an incognito window.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-indigo shrink-0">2.</span>
              <span>Ensure your domain does not have aggressive bot-protection rules enabled (e.g. Cloudflare Under Attack mode).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-indigo shrink-0">3.</span>
              <span>Verify you typed the address correctly (no spaces or typographies).</span>
            </li>
          </ul>
        </div>

        {/* Action button */}
        <div className="pt-2">
          <button
            onClick={handleRetry}
            className="w-full rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet hover:from-brand-indigo hover:to-brand-indigo/90 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-indigo/25 transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-1.5 group"
          >
            Configure New Audit
            <div className="rounded-md p-0.5 transition-all duration-200 group-hover:bg-white/20">
              <RefreshCw className="h-4 w-4 transition-all duration-200 group-hover:scale-110 group-hover:rotate-180" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}
