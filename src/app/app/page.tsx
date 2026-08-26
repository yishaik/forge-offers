'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { t, Language } from '@/lib/i18n';
import { OfferData, LineItem, SAMPLE_BRIEFS } from '@/lib/types';
import { parseBrief, generateLineItems, generateId } from '@/lib/parser';
import { saveOffer, compressOffer } from '@/lib/storage';

const defaultLineItem = (lang: Language): LineItem => ({
  id: generateId(),
  description: '',
  quantity: 1,
  unit: lang === 'he' ? 'יחידה' : 'unit',
  unitPrice: 0,
});

export default function BuilderPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('en');
  const [brief, setBrief] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  
  const [offer, setOffer] = useState<OfferData>(() => {
    const now = new Date();
    const validUntil = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    return {
      id: generateId(),
      businessName: '',
      clientName: '',
      clientEmail: '',
      projectTitle: '',
      projectDescription: '',
      lineItems: [defaultLineItem('en')],
      currency: 'USD',
      language: 'en',
      vatRate: 17,
      includeVat: true,
      validUntil: validUntil.toISOString().split('T')[0],
      notes: '',
      createdAt: now.toISOString(),
    };
  });

  const isRtl = language === 'he';

  const handleParseBrief = () => {
    if (!brief.trim()) return;
    
    const parsed = parseBrief(brief);
    const lineItems = generateLineItems(parsed);
    
    const newLanguage = parsed.detectedLanguage || 'en';
    const newCurrency = parsed.detectedCurrency || 'USD';
    
    setLanguage(newLanguage);
    setOffer(prev => ({
      ...prev,
      projectDescription: brief,
      lineItems: lineItems.length > 0 ? lineItems : [defaultLineItem(newLanguage)],
      currency: newCurrency,
      language: newLanguage,
    }));
  };

  const handleSampleBrief = (type: 'hebrew' | 'english') => {
    const sampleBrief = SAMPLE_BRIEFS[type];
    setBrief(sampleBrief);
    
    const parsed = parseBrief(sampleBrief);
    const lineItems = generateLineItems(parsed);
    
    const newLanguage = type === 'hebrew' ? 'he' : 'en';
    const newCurrency = type === 'hebrew' ? 'ILS' : 'USD';
    
    setLanguage(newLanguage);
    setOffer(prev => ({
      ...prev,
      projectDescription: sampleBrief,
      lineItems: lineItems.length > 0 ? lineItems : [defaultLineItem(newLanguage)],
      currency: newCurrency,
      language: newLanguage,
      businessName: type === 'hebrew' ? 'סטודיו דיגיטל' : 'Digital Studio',
      clientName: type === 'hebrew' ? 'מיכל' : 'Sarah',
      projectTitle: type === 'hebrew' ? 'אתר וורדפרס לסטודיו יוגה' : 'Brand Website for Consulting Business',
    }));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setOffer(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addLineItem = () => {
    setOffer(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, defaultLineItem(offer.language)],
    }));
  };

  const removeLineItem = (id: string) => {
    if (offer.lineItems.length <= 1) return;
    setOffer(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id),
    }));
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

  const formatCurrency = (amount: number) => {
    const symbol = offer.currency === 'ILS' ? '₪' : '$';
    return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const handlePreview = () => {
    saveOffer(offer);
    const compressed = compressOffer(offer);
    router.push(`/offer/?data=${compressed}`);
  };

  const handleCopyLink = async () => {
    saveOffer(offer);
    const compressed = compressOffer(offer);
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}${window.location.pathname.replace('/app/', '')}`
      : '';
    const url = `${baseUrl}/offer/?data=${compressed}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-warm-100 ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Header showCta={false} language={language} />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-warm-black mb-8">
            {t('builderTitle', language)}
          </h1>

          {/* Brief Input Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <label className="block text-sm font-medium text-warm-700 mb-2">
              {t('pasteLabel', language)}
            </label>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder={t('pastePlaceholder', language)}
              className="w-full h-40 px-4 py-3 border border-warm-200 rounded-xl resize-none text-warm-700 placeholder:text-warm-400"
              dir={isRtl ? 'rtl' : 'ltr'}
            />
            <div className={`flex flex-wrap items-center gap-3 mt-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={handleParseBrief}
                className="px-6 py-2.5 bg-ember text-white rounded-lg font-medium hover:bg-ember-dark transition-colors"
              >
                {t('parseButton', language)}
              </button>
              <span className="text-warm-500 text-sm">{t('trySample', language)}</span>
              <button
                onClick={() => handleSampleBrief('hebrew')}
                className="px-4 py-2 bg-warm-100 text-warm-700 rounded-lg text-sm hover:bg-warm-200 transition-colors"
              >
                {t('sampleHebrew', language)}
              </button>
              <button
                onClick={() => handleSampleBrief('english')}
                className="px-4 py-2 bg-warm-100 text-warm-700 rounded-lg text-sm hover:bg-warm-200 transition-colors"
              >
                {t('sampleEnglish', language)}
              </button>
            </div>
          </div>

          {/* Offer Details Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  {t('businessName', language)}
                </label>
                <input
                  type="text"
                  value={offer.businessName}
                  onChange={(e) => setOffer(prev => ({ ...prev, businessName: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-warm-200 rounded-lg"
                  dir={isRtl ? 'rtl' : 'ltr'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  {t('clientName', language)}
                </label>
                <input
                  type="text"
                  value={offer.clientName}
                  onChange={(e) => setOffer(prev => ({ ...prev, clientName: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-warm-200 rounded-lg"
                  dir={isRtl ? 'rtl' : 'ltr'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  {t('clientEmail', language)}
                </label>
                <input
                  type="email"
                  value={offer.clientEmail}
                  onChange={(e) => setOffer(prev => ({ ...prev, clientEmail: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-warm-200 rounded-lg"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  {t('projectTitle', language)}
                </label>
                <input
                  type="text"
                  value={offer.projectTitle}
                  onChange={(e) => setOffer(prev => ({ ...prev, projectTitle: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-warm-200 rounded-lg"
                  dir={isRtl ? 'rtl' : 'ltr'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  {t('currency', language)}
                </label>
                <select
                  value={offer.currency}
                  onChange={(e) => setOffer(prev => ({ ...prev, currency: e.target.value as 'ILS' | 'USD' }))}
                  className="w-full px-4 py-2.5 border border-warm-200 rounded-lg"
                >
                  <option value="ILS">₪ ILS (Israeli Shekel)</option>
                  <option value="USD">$ USD (US Dollar)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  {t('language', language)}
                </label>
                <select
                  value={offer.language}
                  onChange={(e) => {
                    const newLang = e.target.value as Language;
                    setOffer(prev => ({ ...prev, language: newLang }));
                    setLanguage(newLang);
                  }}
                  className="w-full px-4 py-2.5 border border-warm-200 rounded-lg"
                >
                  <option value="en">English</option>
                  <option value="he">עברית (Hebrew)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  {t('validUntil', language)}
                </label>
                <input
                  type="date"
                  value={offer.validUntil}
                  onChange={(e) => setOffer(prev => ({ ...prev, validUntil: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-warm-200 rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={offer.includeVat}
                    onChange={(e) => setOffer(prev => ({ ...prev, includeVat: e.target.checked }))}
                    className="w-5 h-5 rounded border-warm-300 text-ember focus:ring-ember"
                  />
                  <span className="text-sm font-medium text-warm-700">
                    {t('includeVat', language)}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-warm-black mb-4">
              {t('lineItems', language)}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className={`pb-3 text-sm font-medium text-warm-500 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t('description', language)}
                    </th>
                    <th className="pb-3 text-sm font-medium text-warm-500 text-center w-20">
                      {t('qty', language)}
                    </th>
                    <th className="pb-3 text-sm font-medium text-warm-500 text-center w-24">
                      {t('unit', language)}
                    </th>
                    <th className={`pb-3 text-sm font-medium text-warm-500 w-32 ${isRtl ? 'text-left' : 'text-right'}`}>
                      {t('unitPrice', language)}
                    </th>
                    <th className={`pb-3 text-sm font-medium text-warm-500 w-32 ${isRtl ? 'text-left' : 'text-right'}`}>
                      {t('total', language)}
                    </th>
                    <th className="pb-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {offer.lineItems.map((item) => (
                    <tr key={item.id} className="border-b border-warm-100">
                      <td className="py-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-warm-200 rounded-lg text-sm"
                          dir={isRtl ? 'rtl' : 'ltr'}
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-full px-3 py-2 border border-warm-200 rounded-lg text-sm text-center"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => updateLineItem(item.id, 'unit', e.target.value)}
                          className="w-full px-3 py-2 border border-warm-200 rounded-lg text-sm text-center"
                          dir={isRtl ? 'rtl' : 'ltr'}
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className={`w-full px-3 py-2 border border-warm-200 rounded-lg text-sm ${isRtl ? 'text-left' : 'text-right'}`}
                        />
                      </td>
                      <td className={`py-3 px-2 text-sm font-medium text-warm-700 ${isRtl ? 'text-left' : 'text-right'}`}>
                        {formatCurrency(item.quantity * item.unitPrice)}
                      </td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => removeLineItem(item.id)}
                          className="p-1 text-warm-400 hover:text-red-500 transition-colors"
                          disabled={offer.lineItems.length <= 1}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button
              onClick={addLineItem}
              className="mt-4 flex items-center gap-2 text-ember hover:text-ember-dark transition-colors text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t('addItem', language)}
            </button>

            {/* Totals */}
            <div className={`mt-6 pt-6 border-t border-warm-200 ${isRtl ? 'text-left' : 'text-right'}`}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-500">{t('subtotal', language)}</span>
                  <span className="text-warm-700 font-medium">{formatCurrency(calculateSubtotal())}</span>
                </div>
                {offer.includeVat && (
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-500">{t('vat', language)}</span>
                    <span className="text-warm-700 font-medium">{formatCurrency(calculateVat())}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg pt-2 border-t border-warm-200">
                  <span className="font-semibold text-warm-black">{t('grandTotal', language)}</span>
                  <span className="font-bold text-ember">{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <label className="block text-sm font-medium text-warm-700 mb-2">
              {t('notes', language)}
            </label>
            <textarea
              value={offer.notes}
              onChange={(e) => setOffer(prev => ({ ...prev, notes: e.target.value }))}
              placeholder={t('notesPlaceholder', language)}
              className="w-full h-24 px-4 py-3 border border-warm-200 rounded-xl resize-none text-warm-700 placeholder:text-warm-400"
              dir={isRtl ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Actions */}
          <div className={`flex flex-wrap gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handlePreview}
              className="flex-1 sm:flex-none px-8 py-3 bg-ember text-white rounded-xl font-semibold hover:bg-ember-dark transition-colors"
            >
              {t('previewOffer', language)}
            </button>
            <button
              onClick={handleCopyLink}
              className={`flex-1 sm:flex-none px-8 py-3 border-2 border-warm-black text-warm-black rounded-xl font-semibold hover:bg-warm-black hover:text-white transition-colors ${linkCopied ? 'bg-green-600 border-green-600 text-white hover:bg-green-600' : ''}`}
            >
              {linkCopied ? t('linkCopied', language) : t('copyLink', language)}
            </button>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
