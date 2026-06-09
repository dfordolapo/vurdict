import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { Heart, Brain, Cloud, Terminal, HeartHandshake } from 'lucide-react';
import supportIllustration from '../assets/support_illustration.png';

export default function SupportPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between select-none font-sans relative overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg h-16 px-6 md:px-12 border-b border-slate-100 flex items-center">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <Logo onClick={() => navigate('/')} />
          <button
            onClick={() => navigate('/')}
            className="text-xs font-normal text-slate-500 hover:text-brand-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>← Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-24 md:py-32 text-center space-y-8 select-text">
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <div className="w-full max-w-[200px] mb-4 mx-auto">
            <img src={supportIllustration} alt="Support Vurdict illustration" className="w-full h-auto object-contain select-none" />
          </div>
          <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Support Vurdict</h1>
          <p className="text-sm text-slate-500 leading-relaxed font-normal">
            If Vurdict has helped you understand your portfolio better, consider supporting us. We are a small team keeping this free and accessible for every designer trying to break in or level up, and every contribution helps us do that.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mt-6 uppercase tracking-wider">What Your Support Covers</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "AI evaluation costs", desc: "Every analysis runs through the Gemini API, which has a cost per request.", icon: Brain },
              { title: "Infrastructure", desc: "Hosting, URL reading services, and keeping the platform fast and reliable.", icon: Cloud },
              { title: "Development", desc: "New features like Co-Pilot, email delivery, and expanded role support.", icon: Terminal },
              { title: "Keeping it free", desc: "Ensuring a junior designer in Lagos has access to the same quality feedback as one in London.", icon: HeartHandshake }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-slate-50/50 border border-slate-100/70 p-5 rounded-2xl space-y-3 flex flex-col items-center text-center group hover:bg-slate-50 hover:border-slate-200 transition-all">
                  <div className="w-fit mx-auto rounded-xl p-2 bg-blue-50/80 border border-blue-100/60 text-blue-600 transition-all duration-200 group-hover:bg-blue-100 group-hover:border-blue-200">
                    <Icon size={16} className="text-blue-600 transition-all duration-200 group-hover:scale-110" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 font-normal leading-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-5 bg-blue-50/30 border border-blue-100/50 p-6 rounded-3xl mt-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-700 uppercase">
            <Heart size={14} className="text-blue-600 fill-blue-600/10" />
            <span>How to Support Us</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            You can make a one-time contribution of any amount via Paystack. No account required.
          </p>
          <a
            href="https://paystack.com/pay/support-vurdict" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-900 hover:bg-brand-800 text-white px-6 py-3.5 text-sm font-semibold transition-all shadow-md hover:-translate-y-0.5"
          >
            <span>Support Vurdict on Paystack →</span>
          </a>
        </section>

        <section className="space-y-4 border-t border-slate-100 pt-8">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">For Investors and Partnerships</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Vurdict is early but growing. If you are interested in investing, partnering, or exploring what this product could become at scale, we would love to hear from you.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Reach out at:{" "}
            <a href="mailto:vurdict@gmail.com" className="text-brand-900 font-semibold hover:underline">
              vurdict@gmail.com
            </a>
          </p>
        </section>

        <section className="space-y-4 border-t border-slate-100 pt-6 text-center">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Thank You</h2>
          <p className="text-sm text-slate-500 leading-relaxed font-normal italic">
            Whether you contribute financially or simply share Vurdict with a designer who needs honest feedback, you are part of why this exists.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 bg-white text-slate-500 z-10 shrink-0">
        <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center">
              <Logo size="small" />
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              &copy; 2026 Vurdict. The Reviewer's Perspective.
            </p>
          </div>
          <div className="flex gap-6 text-xs font-normal text-slate-500">
            <Link to="/privacy" className="hover:text-brand-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-900 transition-colors">Terms of Use</Link>
            <Link to="/support" className="hover:text-brand-900 transition-colors">Support Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
