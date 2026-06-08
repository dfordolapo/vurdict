'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAnalysis } from '../../hooks/use-analysis';
import { GoalType, ExperienceLevel } from '../../lib/types';
import { Check, Sparkles, Loader2, ServerCrash } from 'lucide-react';
import { cn } from '../../lib/utils';

// Core loading content component
function AnalyzingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, startAnalysis } = useAnalysis();

  const url = searchParams.get('url') || 'yourportfolio.com';
  const goal = (searchParams.get('goal') || 'get_hired') as GoalType;
  const level = (searchParams.get('level') || 'mid') as ExperienceLevel;
  const isMock = searchParams.get('mock') === 'true';

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Parsing portfolio layout & content structure...',
    'Evaluating Visual Hierarchy & design tokens...',
    'Extracting UX Case Study Research Depth...',
    'Calculating Business & User Impact metrics...',
    'Calibrating Narrative Tone & storytelling...',
    'Testing Technical Execution & responsiveness...',
  ];

  // Start analysis trigger
  useEffect(() => {
    startAnalysis(url, goal, level, isMock);
  }, [url, goal, level, isMock]);

  // Handle local loading progress bars & checklist check-offs
  useEffect(() => {
    const totalDuration = 8000; // 8 seconds matching startAnalysis timeout
    const stepIntervalTime = totalDuration / steps.length;
    const progressIntervalTime = 80; // refresh progress bar every 80ms
    const totalTicks = totalDuration / progressIntervalTime;
    
    let tickCount = 0;
    
    const progressInterval = setInterval(() => {
      tickCount++;
      const currentProgress = Math.min((tickCount / totalTicks) * 100, 99);
      setProgress(Math.floor(currentProgress));
    }, progressIntervalTime);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepIntervalTime);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  // Watch analysis state from context
  useEffect(() => {
    if (state.status === 'completed') {
      setProgress(100);
      setCurrentStep(steps.length);
      const timeout = setTimeout(() => {
        router.push('/results');
      }, 500);
      return () => clearTimeout(timeout);
    } else if (state.status === 'error') {
      router.push('/error');
    }
  }, [state.status, router]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full text-center">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-brand-indigo/30 bg-brand-indigo/10 px-4 py-1.5 text-xs font-semibold text-brand-indigo group hover:bg-brand-indigo/20 hover:border-brand-indigo/50 transition-all">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-indigo opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-indigo" />
        </span>
        <div className="rounded-md p-0.5 transition-all duration-200 group-hover:bg-brand-indigo/20 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.2)]">
          <Sparkles className="h-3 w-3 transition-all duration-200 group-hover:scale-125 group-hover:rotate-12" />
        </div>
        AI Analysis in Progress
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-6">
        Evaluating Your Portfolio
      </h1>
      <p className="mt-2 text-slate-400 text-sm sm:text-base font-medium max-w-md mx-auto">
        Analyzing <span className="text-white font-semibold">{url}</span>. We are running audits across all six hiring dimensions.
      </p>

      {/* Progress Circle & Text */}
      <div className="mt-12 flex flex-col items-center">
        <div className="relative flex h-24 sm:h-28 w-24 sm:w-28 items-center justify-center">
          <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" className="stroke-navy-900" strokeWidth="6" fill="transparent" />
            <circle 
              cx="50" 
              cy="50" 
              r="42" 
              className="stroke-brand-indigo transition-all duration-300" 
              strokeWidth="6" 
              fill="transparent" 
              strokeDasharray="263.89" 
              strokeDashoffset={263.89 - (progress / 100) * 263.89}
            />
          </svg>
          <div className="text-center">
            <span className="text-3xl font-extrabold text-white">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mt-12 max-w-xl mx-auto glass-panel rounded-2xl p-6 text-left space-y-4 shadow-xl border-navy-800/80">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-navy-800/60 pb-3">
          Analysis Timeline
        </h2>
        
        <div className="space-y-3 pt-2">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isActive = idx === currentStep;
            return (
              <div 
                key={idx} 
                className={cn(
                  "flex items-center gap-3 text-xs sm:text-sm transition-opacity duration-300",
                  isDone ? "text-slate-300 font-semibold" : isActive ? "text-white font-bold" : "text-slate-600 font-medium"
                )}
              >
                <div className={cn(
                  "h-5 w-5 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0",
                  isDone 
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" 
                    : isActive 
                      ? "border-brand-indigo text-brand-indigo animate-pulse" 
                      : "border-navy-800 text-transparent"
                )}>
                  {isDone ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : isActive ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : null}
                </div>
                <span>{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500 font-medium font-mono">
        This usually takes just a few minutes. Please do not close this tab.
      </p>
    </div>
  );
}

// Shell component with Suspense fallback wrapper
export default function AnalyzingPage() {
  return (
    <div className="flex-1 bg-navy-950 bg-grid-pattern flex items-center py-16">
      <Suspense fallback={
        <div className="mx-auto max-w-md text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand-indigo mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-slate-400 text-sm font-semibold">Loading analysis config...</p>
        </div>
      }>
        <AnalyzingContent />
      </Suspense>
    </div>
  );
}
