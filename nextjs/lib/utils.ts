import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SCORE_BANDS = [
  { min: 86, max: 100, label: 'Exceptional', description: 'Represents outstanding quality and differentiation.' },
  { min: 71, max: 85, label: 'Strong', description: 'Demonstrates strong execution and hiring readiness.' },
  { min: 51, max: 70, label: 'Competitive', description: 'Shows a solid foundation with room for improvement.' },
  { min: 31, max: 50, label: 'Early Foundation', description: 'Some fundamentals are present, but important gaps remain.' },
  { min: 0, max: 30, label: 'Significant Gaps', description: 'Major weaknesses were identified. Substantial improvements are needed.' },
] as const;

export function getScoreBand(score: number) {
  return SCORE_BANDS.find(b => score >= b.min && score <= b.max) || SCORE_BANDS[4];
}

export function getScoreColor(score: number): { text: string; bg: string; border: string; glow: string } {
  if (score >= 86) {
    return {
      text: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      glow: 'shadow-violet-500/20',
    };
  }
  if (score >= 71) {
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
    };
  }
  if (score >= 51) {
    return {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/20',
    };
  }
  if (score >= 31) {
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

export function getScoreStatus(score: number): 'Exceptional' | 'Strong' | 'Competitive' | 'Early Foundation' | 'Significant Gaps' {
  if (score >= 86) return 'Exceptional';
  if (score >= 71) return 'Strong';
  if (score >= 51) return 'Competitive';
  if (score >= 31) return 'Early Foundation';
  return 'Significant Gaps';
}

export function getRingDashOffset(score: number, radius: number): number {
  const circumference = 2 * Math.PI * radius;
  return circumference - (score / 100) * circumference;
}
