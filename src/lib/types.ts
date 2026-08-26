export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface OfferData {
  id: string;
  businessName: string;
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  projectDescription: string;
  lineItems: LineItem[];
  currency: 'ILS' | 'USD';
  language: 'en' | 'he';
  vatRate: number;
  includeVat: boolean;
  validUntil: string;
  notes: string;
  createdAt: string;
}

export interface ParsedBrief {
  prices: { amount: number; currency: 'ILS' | 'USD' }[];
  durations: { value: number; unit: string }[];
  bullets: string[];
  detectedCurrency: 'ILS' | 'USD' | null;
  detectedLanguage: 'en' | 'he' | null;
}

export const SAMPLE_BRIEFS = {
  hebrew: `היי, צריך אתר וורדפרס לעסק שלי - סטודיו ליוגה בתל אביב.

הדרישות:
• עמוד בית עם תמונות ומידע על הסטודיו
• דף שיעורים עם לוח זמנים
• מערכת הזמנת שיעורים (אפשר Calendly או משהו דומה)
• דף צוות המורים
• טופס יצירת קשר
• קישור לאינסטגרם

התקציב שלי בסביבות 4,500-6,000 ש"ח
צריך את זה תוך 3 שבועות אם אפשר

תודה!
מיכל`,
  
  english: `Hi, I need a brand website for my consulting business.

What I'm looking for:
- Modern, clean design (think Stripe or Linear style)
- Home page with value prop and services
- About page with team bios
- Case studies section (3-4 examples)
- Contact form with Calendly integration
- Blog setup (I'll write the content)
- Basic SEO optimization

Budget: $3,000-4,500
Timeline: 4-5 weeks would be ideal

Looking forward to your quote!
Sarah`
};
