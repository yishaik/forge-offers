export const translations = {
  en: {
    // Landing
    heroTitle: "Paste the job.",
    heroTitle2: "Send a priced page.",
    heroTitle3: "Get paid.",
    heroSubtitle: "Turn messy briefs into polished offers in seconds. No templates. No spreadsheets. Just business.",
    ctaButton: "Create Your First Offer",
    
    // Sections
    leakTitle: "The Leak",
    leakDesc: "Every unclear quote costs you time, credibility, or money. Clients ghost vague proposals. Detailed ones take hours to write.",
    
    offerPageTitle: "The Offer Page",
    offerPageDesc: "A clean, professional page your client can bookmark, share with their team, and approve with one click.",
    
    closeTitle: "The Close",
    closeDesc: "They approve. You get notified. The work begins. No back-and-forth, no \"can you send that as a PDF?\"",
    
    // Pricing
    pricingTitle: "Pricing",
    freeTier: "Free",
    freeDesc: "3 offers per month",
    proTier: "Pro",
    proPrice: "$29/mo",
    proDesc: "Unlimited offers",
    feeNote: "2.5% when you collect payment through Forge",
    
    // Builder
    builderTitle: "Create Offer",
    pasteLabel: "Paste the job brief",
    pastePlaceholder: "Paste the client's message, brief, or requirements here...",
    parseButton: "Parse Brief",
    trySample: "Try sample:",
    sampleHebrew: "Hebrew (WordPress + booking)",
    sampleEnglish: "English (Brand site + SEO)",
    
    businessName: "Your Business Name",
    clientName: "Client Name",
    clientEmail: "Client Email",
    projectTitle: "Project Title",
    currency: "Currency",
    language: "Language",
    includeVat: "Include VAT (17%)",
    validUntil: "Valid Until",
    notes: "Notes",
    notesPlaceholder: "Payment terms, timeline, or other notes...",
    
    // Line Items
    lineItems: "Line Items",
    description: "Description",
    qty: "Qty",
    unit: "Unit",
    unitPrice: "Unit Price",
    total: "Total",
    addItem: "Add Item",
    
    // Summary
    subtotal: "Subtotal",
    vat: "VAT (17%)",
    grandTotal: "Grand Total",
    
    // Actions
    previewOffer: "Preview Offer",
    copyLink: "Copy Shareable Link",
    linkCopied: "Link copied!",
    
    // Offer Page
    offerFor: "Offer for",
    preparedBy: "Prepared by",
    validUntilLabel: "Valid until",
    approveOffer: "Approve Offer",
    requestChanges: "Request Changes",
    printOffer: "Print / Save PDF",
    
    // Footer
    footer: "Forge · Tel Aviv · 2026",
  },
  he: {
    // Landing
    heroTitle: "הדבק את הבריף.",
    heroTitle2: "שלח עמוד מחיר.",
    heroTitle3: "קבל תשלום.",
    heroSubtitle: "הפוך בריפים מבולגנים להצעות מקצועיות בשניות. בלי תבניות. בלי אקסלים. רק עסקים.",
    ctaButton: "צור את ההצעה הראשונה",
    
    // Sections
    leakTitle: "הדליפה",
    leakDesc: "כל הצעת מחיר לא ברורה עולה לך זמן, אמינות או כסף. לקוחות מתעלמים מהצעות מעורפלות. מפורטות לוקחות שעות לכתוב.",
    
    offerPageTitle: "עמוד ההצעה",
    offerPageDesc: "עמוד נקי ומקצועי שהלקוח יכול לשמור, לשתף עם הצוות, ולאשר בלחיצה אחת.",
    
    closeTitle: "הסגירה",
    closeDesc: "הם מאשרים. אתה מקבל התראה. העבודה מתחילה. בלי הלוך-חזור, בלי \"אפשר לשלוח PDF?\"",
    
    // Pricing
    pricingTitle: "תמחור",
    freeTier: "חינם",
    freeDesc: "3 הצעות בחודש",
    proTier: "פרו",
    proPrice: "₪99/חודש",
    proDesc: "הצעות ללא הגבלה",
    feeNote: "2.5% כשמקבלים תשלום דרך Forge",
    
    // Builder
    builderTitle: "יצירת הצעה",
    pasteLabel: "הדבק את הבריף",
    pastePlaceholder: "הדבק כאן את ההודעה, הבריף או הדרישות של הלקוח...",
    parseButton: "נתח בריף",
    trySample: "נסה דוגמה:",
    sampleHebrew: "עברית (וורדפרס + הזמנות)",
    sampleEnglish: "אנגלית (אתר מותג + SEO)",
    
    businessName: "שם העסק שלך",
    clientName: "שם הלקוח",
    clientEmail: "אימייל הלקוח",
    projectTitle: "שם הפרויקט",
    currency: "מטבע",
    language: "שפה",
    includeVat: 'כולל מע"מ (17%)',
    validUntil: "בתוקף עד",
    notes: "הערות",
    notesPlaceholder: "תנאי תשלום, לוחות זמנים, או הערות נוספות...",
    
    // Line Items
    lineItems: "פריטים",
    description: "תיאור",
    qty: 'כמות',
    unit: "יחידה",
    unitPrice: "מחיר ליחידה",
    total: 'סה"כ',
    addItem: "הוסף פריט",
    
    // Summary
    subtotal: 'סיכום ביניים',
    vat: 'מע"מ (17%)',
    grandTotal: 'סה"כ לתשלום',
    
    // Actions
    previewOffer: "תצוגה מקדימה",
    copyLink: "העתק קישור לשיתוף",
    linkCopied: "הקישור הועתק!",
    
    // Offer Page
    offerFor: "הצעת מחיר עבור",
    preparedBy: "הוכן על ידי",
    validUntilLabel: "בתוקף עד",
    approveOffer: "אשר הצעה",
    requestChanges: "בקש שינויים",
    printOffer: "הדפס / שמור PDF",
    
    // Footer
    footer: "Forge · תל אביב · 2026",
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function t(key: TranslationKey, lang: Language = 'en'): string {
  return translations[lang][key] || translations.en[key] || key;
}
