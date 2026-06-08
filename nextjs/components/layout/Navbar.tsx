'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navLinks = [
    { label: 'Overview', href: isHome ? '#overview' : '/' },
    { label: 'How it Works', href: isHome ? '#how-it-works' : '/#how-it-works' },
    { label: 'FAQ', href: isHome ? '#faq' : '/#faq' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-navy-800/40 bg-navy-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/assets/vurdict-logo.png"
            alt="Vurdict"
            width={140}
            height={62}
            className="object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button + Hamburger */}
        <div className="flex items-center gap-2">
          <Link
            href="/analyze"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-brand-indigo/10 group",
              pathname === '/analyze'
                ? "bg-navy-800 border border-navy-700 cursor-default"
                : "bg-gradient-to-r from-navy-800 to-navy-900 border border-navy-700/60 hover:border-brand-indigo/40 hover:from-navy-750 hover:to-navy-850"
            )}
          >
            <span className="hidden xs:inline">Analyze Portfolio</span>
            <span className="xs:hidden inline">Analyze</span>
            <div className="rounded-md p-0.5 transition-all duration-200 group-hover:bg-white/20">
              <ArrowRight className="h-4 w-4 text-brand-indigo transition-all duration-200 group-hover:translate-x-1" />
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:text-white hover:bg-navy-800 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-navy-800/40 bg-navy-950/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-navy-800/60 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
