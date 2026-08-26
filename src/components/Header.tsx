'use client';

import Link from 'next/link';

interface HeaderProps {
  showCta?: boolean;
  language?: 'en' | 'he';
}

export default function Header({ showCta = true, language = 'en' }: HeaderProps) {
  const isRtl = language === 'he';
  
  return (
    <header className="w-full border-b border-warm-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-ember rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight text-warm-black font-serif">Forge</span>
          </Link>
          
          {showCta && (
            <Link
              href="/app/"
              className="inline-flex items-center px-4 py-2 bg-warm-black text-white rounded-lg text-sm font-medium hover:bg-warm-700 transition-colors"
            >
              {isRtl ? 'צור הצעה' : 'Create Offer'}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
