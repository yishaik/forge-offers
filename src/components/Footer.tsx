'use client';

import { t, Language } from '@/lib/i18n';

interface FooterProps {
  language?: Language;
}

export default function Footer({ language = 'en' }: FooterProps) {
  const isRtl = language === 'he';
  
  return (
    <footer className={`w-full border-t border-warm-200 py-8 no-print ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-ember rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <span className="text-warm-500 text-sm">{t('footer', language)}</span>
          </div>
          
          <div className={`flex items-center gap-6 text-sm text-warm-500 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <a href="mailto:hello@forgeoffers.com" className="hover:text-warm-black transition-colors">
              {isRtl ? 'צור קשר' : 'Contact'}
            </a>
            <a href="#" className="hover:text-warm-black transition-colors">
              {isRtl ? 'תנאי שימוש' : 'Terms'}
            </a>
            <a href="#" className="hover:text-warm-black transition-colors">
              {isRtl ? 'פרטיות' : 'Privacy'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
