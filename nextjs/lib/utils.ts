import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): { text: string; bg: string; border: string; glow: string } {
  if (score >= 80) {
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
    };
  }
  if (score >= 70) {
    return {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/20',
    };
  }
  if (score >= 55) {
    return {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/20',
    };
  }
  return {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    glow: 'shadow-rose-500/20',
  };
}

export function getScoreStatus(score: number): 'Strong' | 'Good' | 'Needs Work' | 'Critical' {
  if (score >= 80) return 'Strong';
  if (score >= 70) return 'Good';
  if (score >= 55) return 'Needs Work';
  return 'Critical';
}

export function getRingDashOffset(score: number, radius: number): number {
  const circumference = 2 * Math.PI * radius;
  return circumference - (score / 100) * circumference;
}
