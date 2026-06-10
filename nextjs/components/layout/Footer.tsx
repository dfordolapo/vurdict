import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-navy-800/40 bg-navy-950 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
        {/* Left: Logo & Copyright */}
        <div className="flex items-center gap-2">
          <img
            src="/assets/vurdict-logo.png"
            alt="Vurdict"
            width={32}
            height={14}
            className="object-contain"
          />
          <span className="text-xs text-slate-500 ml-2">
            © {new Date().getFullYear()} Vurdict. All rights reserved.
          </span>
        </div>

        {/* Right: Links */}
        <div className="flex gap-6 text-xs text-slate-500 font-semibold">
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-slate-300 transition-colors">
            Terms of Use
          </Link>
          <Link href="/support" className="hover:text-slate-300 transition-colors">
            Support Us
          </Link>
          <span className="text-navy-700">|</span>
          <Link href="/revurdict" className="text-brand-indigo hover:text-white transition-colors font-bold">
            Re:Vurdict
          </Link>
        </div>
      </div>
    </footer>
  );
}
