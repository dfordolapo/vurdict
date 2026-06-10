import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { Heart, Brain, Cloud, Terminal, HeartHandshake, X, CheckCircle, Loader2, ChevronDown } from 'lucide-react';
import supportIllustration from '../assets/support_illustration.png';

const DONATION_UNAVAILABLE = 'Support payments are temporarily unavailable. Please try again later.';

const CURRENCIES = [
  { code: 'NGN', symbol: '\u20A6', min: 100 },
  { code: 'USD', symbol: '$', min: 1 },
  { code: 'GBP', symbol: '\u00A3', min: 1 },
  { code: 'EUR', symbol: '\u20AC', min: 1 },
];

export default function SupportPage() {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [currency, setCurrency] = useState('NGN');
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [payError, setPayError] = useState('');

  const currencySymbol = CURRENCIES.find(c => c.code === currency)?.symbol || '\u20A6';
  const AMOUNTS = currency === 'NGN' ? [1000, 2000, 5000] : [10, 20, 50];

  useEffect(() => {
    setSelectedAmount(AMOUNTS[0]);
    setUseCustom(false);
    setCustomAmount('');
  }, [currency]);

  const formatAmount = (val) => {
    return new Intl.NumberFormat('en-US').format(val);
  };

  const handleAmountSelect = (val) => {
    setSelectedAmount(val);
    setUseCustom(false);
    setPayError('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    setUseCustom(true);
    setPayError('');
  };

  const handlePay = () => {
    const minAmount = CURRENCIES.find(c => c.code === currency)?.min || 100;
    const finalAmount = useCustom ? parseInt(customAmount) : selectedAmount;
    if (!finalAmount || finalAmount < minAmount) {
      setPayError('The minimum amount acceptable is ' + currencySymbol + minAmount.toLocaleString('en-US') + '.');
      return;
    }

    setPayError('');
    setPaying(true);

    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    if (!paystackKey || paystackKey === 'pk_test_xxxxxxxxxxxxx') {
      setPaying(false);
      setPayError(DONATION_UNAVAILABLE);
      return;
    }

    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => startPayment(paystackKey, 'guest@vurdict.app', finalAmount, currency);
      script.onerror = () => {
        setPaying(false);
        setPayError(DONATION_UNAVAILABLE);
      };
      document.body.appendChild(script);
    } else {
      startPayment(paystackKey, 'guest@vurdict.app', finalAmount, currency);
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference }),
      });
      return await res.json();
    } catch {
      return { verified: false };
    }
  };

  const startPayment = (key, email, amount, currency) => {
    try {
      const handler = window.PaystackPop.setup({
        key: key,
        email: email,
        amount: amount * 100,
        currency: currency,
        ref: 'VURDICT-' + Date.now() + '-' + Math.floor(Math.random() * 1000000),
        metadata: {
          custom_fields: [
            {
              display_name: 'Source',
              variable_name: 'source',
              value: 'Support Page'
            }
          ]
        },
        callback: async (response) => {
          const result = await verifyPayment(response.reference);
          setPaying(false);
          if (result.verified) {
            setPaid(true);
          } else {
            setPayError(DONATION_UNAVAILABLE);
          }
        },
        onClose: () => {
          setPaying(false);
        }
      });
      handler.openIframe();
    } catch (err) {
      setPaying(false);
      setPayError(DONATION_UNAVAILABLE);
    }
  };

  const closeModal = () => {
    if (paying) return;
    setModalOpen(false);
    setPaid(false);
    setUseCustom(false);
    setCustomAmount('');
    setSelectedAmount(1000);
    setCurrency('NGN');
    setPayError('');
  };

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
              { title: "Development", desc: "Your support helps fund new features like Re:Vurdict, a curated Case Study Reference Library, email-delivered reports, expanded role support, smarter evaluation systems, and ongoing platform development.", icon: Terminal },
              { title: "Keeping it free", desc: "Ensuring a junior designer in Lagos has access to the same quality feedback as one in London.", icon: HeartHandshake }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-slate-50/50 border border-slate-100/70 p-5 rounded-2xl space-y-3 flex flex-col items-center text-center group hover:bg-slate-50 hover:border-slate-200 transition-all">
                  <Icon size={18} className="text-blue-600 transition-all duration-200 group-hover:scale-110" />
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
            <span>How to Support Us</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            You can make a one-time contribution of any amount via Paystack. No account required.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-900 hover:bg-brand-800 text-white px-6 py-3.5 text-sm font-normal transition-all shadow-md hover:-translate-y-0.5 cursor-pointer mx-auto"
          >
            <Heart size={16} className="fill-white/20" />
            <span>Support Vurdict</span>
          </button>
        </section>

        <section className="space-y-4 border-t border-slate-100 pt-8">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">For Investors and Partnerships</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Vurdict is early but growing. If you are interested in investing, partnering, or exploring what this product could become at scale, we would love to hear from you.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Reach out at:{' '}
            <a href="mailto:hellovurdict@gmail.com" className="text-brand-900 font-semibold hover:underline">
              hellovurdict@gmail.com
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

      {/* Payment Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
            
            {/* Navy top bar */}
            <div className="bg-brand-900 h-12 relative">
              <button
                onClick={closeModal}
                disabled={paying}
                className="absolute top-3 right-3 z-20 p-1.5 rounded-lg text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={14} />
              </button>
            </div>

            <div className="px-6 pb-5">
              {!paid ? (
                <>
                  {/* Header */}
                  <div className="flex flex-col items-center text-center pt-3 pb-5">
                    <h3 className="text-base font-semibold text-slate-900">Support Vurdict</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Every contribution helps make Vurdict accessible to all designers.
                    </p>
                  </div>

                  {/* Amount buttons */}
                  <div className="grid grid-cols-3 gap-2.5 mb-3">
                    {AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => handleAmountSelect(amt)}
                        className={`py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                          !useCustom && selectedAmount === amt
                            ? 'bg-brand-900 text-white border-brand-900 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {currencySymbol}{formatAmount(amt)}
                      </button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 focus-within:border-brand-900/30 focus-within:bg-white transition-all mb-4">
                    <span className="text-xs text-slate-400 font-medium">{currencySymbol}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={customAmount}
                      onChange={handleCustomChange}
                      placeholder="Custom amount"
                      className="w-full bg-transparent text-sm text-slate-800 placeholder:text-xs placeholder-slate-300 focus:outline-none"
                    />
                  </div>

                  {/* Reason */}
                  <div className="flex items-center gap-3 px-1 mb-4">
                    <div className="flex -space-x-1">
                      <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                        <Brain size={10} className="text-blue-600" />
                      </div>
                      <div className="w-5 h-5 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center">
                        <Cloud size={10} className="text-sky-600" />
                      </div>
                      <div className="w-5 h-5 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center">
                        <Terminal size={10} className="text-violet-600" />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Funds go toward <span className="text-slate-700 font-medium">AI costs</span>,{' '}
                      <span className="text-slate-700 font-medium">infrastructure</span>, and{' '}
                      <span className="text-slate-700 font-medium">development</span>.
                    </p>
                  </div>

                  {/* Currency */}
                  <div className="mb-4">
                    <label className="text-[11px] font-medium text-slate-500 block mb-1.5">Currency</label>
                    <div className="relative">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-brand-900/30 focus:bg-white transition-all cursor-pointer"
                      >
                        {CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Error message */}
                  {payError && (
                    <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-xl mb-4">
                      <span>{payError}</span>
                    </div>
                  )}

                  {/* Pay button */}
                  <button
                    onClick={handlePay}
                    disabled={paying}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-sm font-normal transition-all cursor-pointer shadow-lg shadow-brand-950/10 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {paying ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Heart size={15} className="fill-white/20" />
                        <span>Support Vurdict</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 font-medium text-center mt-3">Secured by Paystack</p>
                </>
              ) : (
                /* Success state */
                <div className="flex flex-col items-center text-center pt-8 pb-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">Thank You!</h3>
                  <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-xs mb-6">
                    Your support means the world to us. Every contribution helps us keep Vurdict free and improve it for everyone.
                  </p>
                  <button
                    onClick={closeModal}
                    className="rounded-2xl bg-brand-900 hover:bg-brand-800 text-white px-8 py-3 text-sm font-medium transition-all cursor-pointer shadow-lg shadow-brand-950/10"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
            <span className="text-slate-200">|</span>
            <Link to="/revurdict" className="text-indigo-500 hover:text-indigo-700 transition-colors font-semibold">Re:Vurdict</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
