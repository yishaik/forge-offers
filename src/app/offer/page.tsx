'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { t, Language } from '@/lib/i18n';
import { OfferData } from '@/lib/types';
import { decompressOffer, getOffer, saveOffer } from '@/lib/storage';

function OfferContent() {
  const searchParams = useSearchParams();
  
  const offer = useMemo<OfferData | null>(() => {
    const dataParam = searchParams.get('data');
    const idParam = searchParams.get('id');
    
    let loadedOffer: OfferData | null = null;
    
    if (dataParam) {
      loadedOffer = decompressOffer(dataParam);
      if (loadedOffer && typeof window !== 'undefined') {
        saveOffer(loadedOffer);
      }
    } else if (idParam && typeof window !== 'undefined') {
      loadedOffer = getOffer(idParam);
    }
    
    return loadedOffer;
  }, [searchParams]);

  if (!offer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-warm-100 px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-warm-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-serif font-bold text-warm-black mb-2">Offer Not Found</h1>
          <p className="text-warm-500 mb-8">This offer link may be invalid or expired.</p>
          <Link
            href="/app/"
            className="inline-flex items-center px-6 py-3 bg-ember text-white rounded-lg font-medium hover:bg-ember-dark transition-colors"
          >
            Create New Offer
          </Link>
        </div>
      </div>
    );
  }

  const isRtl = offer.language === 'he';
  const lang = offer.language as Language;

  const formatCurrency = (amount: number) => {
    const symbol = offer.currency === 'ILS' ? '₪' : '$';
    return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const calculateSubtotal = () => {
    return offer.lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateVat = () => {
    return offer.includeVat ? calculateSubtotal() * (offer.vatRate / 100) : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVat();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(offer.language === 'he' ? 'he-IL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleApprove = () => {
    const subject = encodeURIComponent(
      offer.language === 'he'
        ? `אישור הצעה: ${offer.projectTitle}`
        : `Offer Approved: ${offer.projectTitle}`
    );
    const body = encodeURIComponent(
      offer.language === 'he'
        ? `שלום ${offer.businessName},\n\nאני מאשר/ת את ההצעה עבור "${offer.projectTitle}" בסך ${formatCurrency(calculateTotal())}.\n\nנא ליצור קשר להמשך.\n\nתודה,\n${offer.clientName}`
        : `Hi ${offer.businessName},\n\nI approve the offer for "${offer.projectTitle}" at ${formatCurrency(calculateTotal())}.\n\nPlease contact me to proceed.\n\nThanks,\n${offer.clientName}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleRequestChanges = () => {
    const subject = encodeURIComponent(
      offer.language === 'he'
        ? `בקשת שינויים: ${offer.projectTitle}`
        : `Change Request: ${offer.projectTitle}`
    );
    const body = encodeURIComponent(
      offer.language === 'he'
        ? `שלום ${offer.businessName},\n\nלגבי ההצעה עבור "${offer.projectTitle}":\n\nאני מבקש/ת את השינויים הבאים:\n- \n\nתודה,\n${offer.clientName}`
        : `Hi ${offer.businessName},\n\nRegarding the offer for "${offer.projectTitle}":\n\nI would like to request the following changes:\n- \n\nThanks,\n${offer.clientName}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen bg-warm-100 ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header Actions - No Print */}
      <div className="no-print bg-warm-black text-white py-3">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-ember rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <span className="font-semibold font-serif">Forge</span>
            </Link>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 text-sm text-warm-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              {t('printOffer', lang)}
            </button>
          </div>
        </div>
      </div>

      {/* Offer Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:py-0 print:px-0 print:max-w-none">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">
          {/* Offer Header */}
          <div className="bg-warm-black text-white p-8 print:p-6">
            <div className={`flex items-start justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ember rounded-xl flex items-center justify-center print:w-10 print:h-10">
                    <svg className="w-7 h-7 text-white print:w-6 print:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{offer.businessName || 'Forge'}</h2>
                  </div>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold print:text-2xl">
                  {t('offerFor', lang)} {offer.clientName}
                </h1>
                <p className="text-warm-300 mt-2">{offer.projectTitle}</p>
              </div>
              <div className={`text-sm text-warm-300 ${isRtl ? 'text-left' : 'text-right'}`}>
                <p>{t('validUntilLabel', lang)}</p>
                <p className="text-white font-medium">{formatDate(offer.validUntil)}</p>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="p-8 print:p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-warm-200">
                  <th className={`pb-3 text-sm font-semibold text-warm-700 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t('description', lang)}
                  </th>
                  <th className="pb-3 text-sm font-semibold text-warm-700 text-center">
                    {t('qty', lang)}
                  </th>
                  <th className={`pb-3 text-sm font-semibold text-warm-700 ${isRtl ? 'text-left' : 'text-right'}`}>
                    {t('unitPrice', lang)}
                  </th>
                  <th className={`pb-3 text-sm font-semibold text-warm-700 ${isRtl ? 'text-left' : 'text-right'}`}>
                    {t('total', lang)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {offer.lineItems.map((item) => (
                  <tr key={item.id} className="border-b border-warm-100">
                    <td className="py-4">
                      <span className="text-warm-800">{item.description}</span>
                      {item.unit && item.unit !== 'unit' && item.unit !== 'יחידה' && (
                        <span className="text-warm-400 text-sm"> / {item.unit}</span>
                      )}
                    </td>
                    <td className="py-4 text-center text-warm-600">{item.quantity}</td>
                    <td className={`py-4 text-warm-600 ${isRtl ? 'text-left' : 'text-right'}`}>
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className={`py-4 font-medium text-warm-800 ${isRtl ? 'text-left' : 'text-right'}`}>
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className={`mt-8 pt-4 border-t-2 border-warm-200 ${isRtl ? 'text-left' : 'text-right'}`}>
              <div className="inline-block min-w-[200px]">
                <div className="flex justify-between py-2 text-warm-600">
                  <span>{t('subtotal', lang)}</span>
                  <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
                </div>
                {offer.includeVat && (
                  <div className="flex justify-between py-2 text-warm-600">
                    <span>{t('vat', lang)}</span>
                    <span className="font-medium">{formatCurrency(calculateVat())}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 text-xl border-t border-warm-200 mt-2">
                  <span className="font-bold text-warm-black">{t('grandTotal', lang)}</span>
                  <span className="font-bold text-ember">{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {offer.notes && (
              <div className="mt-8 p-4 bg-warm-100 rounded-xl">
                <h3 className="text-sm font-semibold text-warm-700 mb-2">{t('notes', lang)}</h3>
                <p className="text-warm-600 text-sm whitespace-pre-line">{offer.notes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons - No Print */}
          <div className="no-print px-8 pb-8 print:hidden">
            <div className={`flex flex-col sm:flex-row gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
              <button
                onClick={handleApprove}
                className="flex-1 py-4 px-6 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('approveOffer', lang)}
              </button>
              <button
                onClick={handleRequestChanges}
                className="flex-1 py-4 px-6 border-2 border-warm-300 text-warm-700 rounded-xl font-semibold hover:border-warm-400 hover:bg-warm-100 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {t('requestChanges', lang)}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 text-warm-400 text-sm no-print">
          {isRtl ? 'נוצר באמצעות' : 'Powered by'}{' '}
          <Link href="/" className="text-ember hover:text-ember-dark transition-colors font-medium">
            Forge
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OfferPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-warm-100">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-ember rounded-xl"></div>
        </div>
      </div>
    }>
      <OfferContent />
    </Suspense>
  );
}
