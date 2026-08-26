'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { t, Language } from '@/lib/i18n';

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>('en');
  const isRtl = language === 'he';

  return (
    <div className={`min-h-screen flex flex-col ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Header showCta={true} language={language} />
      
      <main className="flex-1">
        {/* Language Toggle */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className={`flex gap-2 ${isRtl ? 'justify-start' : 'justify-end'}`}>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                language === 'en' ? 'bg-warm-black text-white' : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('he')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                language === 'he' ? 'bg-warm-black text-white' : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
              }`}
            >
              עב
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-warm-black leading-tight">
              <span className="block">{t('heroTitle', language)}</span>
              <span className="block text-ember">{t('heroTitle2', language)}</span>
              <span className="block">{t('heroTitle3', language)}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-warm-600 max-w-2xl mx-auto">
              {t('heroSubtitle', language)}
            </p>
            <div className="mt-10">
              <Link
                href="/app/"
                className="inline-flex items-center px-8 py-4 bg-ember text-white rounded-xl text-lg font-semibold hover:bg-ember-dark transition-all transform hover:scale-105 shadow-lg shadow-ember/25"
              >
                {t('ctaButton', language)}
                <svg className={`w-5 h-5 ${isRtl ? 'mr-2 rotate-180' : 'ml-2'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Sections */}
        <section className="bg-warm-100 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:gap-16">
              
              {/* The Leak */}
              <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 text-ember text-sm font-medium mb-4">
                    <span className="w-8 h-px bg-ember"></span>
                    01
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warm-black mb-4">
                    {t('leakTitle', language)}
                  </h2>
                  <p className="text-lg text-warm-600">
                    {t('leakDesc', language)}
                  </p>
                </div>
                <div className="flex-1 w-full max-w-md">
                  <div className="bg-white rounded-2xl shadow-xl p-6 transform -rotate-2">
                    <div className="space-y-3">
                      <div className="h-4 bg-warm-200 rounded w-3/4"></div>
                      <div className="h-4 bg-warm-200 rounded w-full"></div>
                      <div className="h-4 bg-warm-200 rounded w-2/3"></div>
                      <div className="h-4 bg-red-200 rounded w-1/2 mt-4"></div>
                      <div className="text-red-500 text-sm font-medium">💸 {isRtl ? 'אבד בתרגום...' : 'Lost in translation...'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Offer Page */}
              <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${isRtl ? 'lg:flex-row-reverse' : 'lg:flex-row-reverse'}`}>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 text-ember text-sm font-medium mb-4">
                    <span className="w-8 h-px bg-ember"></span>
                    02
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warm-black mb-4">
                    {t('offerPageTitle', language)}
                  </h2>
                  <p className="text-lg text-warm-600">
                    {t('offerPageDesc', language)}
                  </p>
                </div>
                <div className="flex-1 w-full max-w-md">
                  <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-1">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-warm-100">
                      <div className="w-10 h-10 bg-ember rounded-lg"></div>
                      <div>
                        <div className="h-4 bg-warm-700 rounded w-24 mb-1"></div>
                        <div className="h-3 bg-warm-300 rounded w-32"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="h-3 bg-warm-200 rounded w-32"></div>
                        <div className="h-3 bg-warm-300 rounded w-16"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-warm-200 rounded w-40"></div>
                        <div className="h-3 bg-warm-300 rounded w-16"></div>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-warm-100 mt-2">
                        <div className="h-4 bg-warm-700 rounded w-20"></div>
                        <div className="h-4 bg-ember rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Close */}
              <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 text-ember text-sm font-medium mb-4">
                    <span className="w-8 h-px bg-ember"></span>
                    03
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warm-black mb-4">
                    {t('closeTitle', language)}
                  </h2>
                  <p className="text-lg text-warm-600">
                    {t('closeDesc', language)}
                  </p>
                </div>
                <div className="flex-1 w-full max-w-md">
                  <div className="bg-white rounded-2xl shadow-xl p-6 transform -rotate-1">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="text-lg font-semibold text-warm-black">{isRtl ? 'ההצעה אושרה!' : 'Offer Approved!'}</div>
                      <div className="text-sm text-warm-500 mt-1">{isRtl ? 'הלקוח מוכן להתחיל' : 'Client is ready to start'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warm-black text-center mb-12">
              {t('pricingTitle', language)}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Free Tier */}
              <div className="bg-white rounded-2xl border-2 border-warm-200 p-8">
                <h3 className="text-2xl font-bold text-warm-black">{t('freeTier', language)}</h3>
                <p className="text-warm-500 mt-2">{t('freeDesc', language)}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-warm-black">$0</span>
                </div>
                <Link
                  href="/app/"
                  className="mt-6 block w-full py-3 px-4 bg-warm-100 text-warm-black rounded-lg text-center font-medium hover:bg-warm-200 transition-colors"
                >
                  {isRtl ? 'התחל בחינם' : 'Start Free'}
                </Link>
              </div>

              {/* Pro Tier */}
              <div className="bg-warm-black rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ember/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-2xl font-bold relative">{t('proTier', language)}</h3>
                <p className="text-warm-400 mt-2 relative">{t('proDesc', language)}</p>
                <div className="mt-6 relative">
                  <span className="text-4xl font-bold">{t('proPrice', language)}</span>
                </div>
                <button
                  disabled
                  className="mt-6 block w-full py-3 px-4 bg-ember text-white rounded-lg text-center font-medium opacity-75 cursor-not-allowed"
                >
                  {isRtl ? 'בקרוב' : 'Coming Soon'}
                </button>
              </div>
            </div>

            <p className="text-center text-warm-500 mt-8 text-sm">
              {t('feeNote', language)}
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-warm-black py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
              {isRtl ? 'מוכן לסגור יותר עסקאות?' : 'Ready to close more deals?'}
            </h2>
            <p className="text-warm-400 text-lg mb-8">
              {isRtl ? 'הצטרף לפרילנסרים שכבר מקבלים תשלום מהר יותר.' : 'Join freelancers already getting paid faster.'}
            </p>
            <Link
              href="/app/"
              className="inline-flex items-center px-8 py-4 bg-ember text-white rounded-xl text-lg font-semibold hover:bg-ember-dark transition-all transform hover:scale-105"
            >
              {t('ctaButton', language)}
              <svg className={`w-5 h-5 ${isRtl ? 'mr-2 rotate-180' : 'ml-2'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer language={language} />
    </div>
  );
}
