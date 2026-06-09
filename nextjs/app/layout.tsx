import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AnalysisProvider } from '../context/analysis-context';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Vurdict • AI Portfolio Audit for Product Designers',
  description: 'See your design portfolio through a hiring manager\'s eyes. Get goal-aware, high-fidelity portfolio feedback using structured reviews in minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-navy-950 font-sans text-slate-100">
        <AnalysisProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AnalysisProvider>
      </body>
    </html>
  );
}
