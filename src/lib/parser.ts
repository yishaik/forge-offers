import { ParsedBrief, LineItem } from './types';

export function parseBrief(text: string): ParsedBrief {
  const result: ParsedBrief = {
    prices: [],
    durations: [],
    bullets: [],
    detectedCurrency: null,
    detectedLanguage: null,
  };

  // Detect language (Hebrew vs English)
  const hebrewPattern = /[\u0590-\u05FF]/;
  const hebrewChars = (text.match(hebrewPattern) || []).length;
  const totalChars = text.replace(/\s/g, '').length;
  result.detectedLanguage = hebrewChars / totalChars > 0.3 ? 'he' : 'en';

  // Parse prices - ILS patterns
  const ilsPatterns = [
    /₪\s*([\d,]+(?:\.\d{2})?)/g,
    /([\d,]+(?:\.\d{2})?)\s*₪/g,
    /([\d,]+(?:\.\d{2})?)\s*ש["']?ח/g,
    /([\d,]+(?:\.\d{2})?)\s*שקל/g,
    /ILS\s*([\d,]+(?:\.\d{2})?)/gi,
    /([\d,]+(?:\.\d{2})?)\s*ILS/gi,
  ];

  // Parse prices - USD patterns
  const usdPatterns = [
    /\$\s*([\d,]+(?:\.\d{2})?)/g,
    /([\d,]+(?:\.\d{2})?)\s*\$/g,
    /USD\s*([\d,]+(?:\.\d{2})?)/gi,
    /([\d,]+(?:\.\d{2})?)\s*USD/gi,
    /([\d,]+(?:\.\d{2})?)\s*dollars?/gi,
  ];

  const parseAmount = (str: string): number => {
    return parseFloat(str.replace(/,/g, ''));
  };

  ilsPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const amount = parseAmount(match[1]);
      if (amount > 0 && amount < 1000000) {
        result.prices.push({ amount, currency: 'ILS' });
        if (!result.detectedCurrency) result.detectedCurrency = 'ILS';
      }
    }
  });

  usdPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const amount = parseAmount(match[1]);
      if (amount > 0 && amount < 1000000) {
        result.prices.push({ amount, currency: 'USD' });
        if (!result.detectedCurrency) result.detectedCurrency = 'USD';
      }
    }
  });

  // Parse durations
  const weekPattern = /(\d+)(?:-(\d+))?\s*(?:weeks?|שבועות?|שבוע)/gi;
  let match;
  while ((match = weekPattern.exec(text)) !== null) {
    const weeks = match[2] ? Math.ceil((parseInt(match[1]) + parseInt(match[2])) / 2) : parseInt(match[1]);
    result.durations.push({ value: weeks, unit: 'weeks' });
  }

  const dayPattern = /(\d+)\s*(?:days?|ימים?|יום)/gi;
  while ((match = dayPattern.exec(text)) !== null) {
    result.durations.push({ value: parseInt(match[1]), unit: 'days' });
  }

  // Parse bullets/list items
  const bulletPatterns = [
    /^[-•*]\s*(.+)$/gm,
    /^\d+[.)]\s*(.+)$/gm,
  ];

  bulletPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const bullet = match[1].trim();
      if (bullet.length > 5 && bullet.length < 200) {
        result.bullets.push(bullet);
      }
    }
  });

  return result;
}

export function generateLineItems(parsed: ParsedBrief): LineItem[] {
  const items: LineItem[] = [];
  const currency = parsed.detectedCurrency || 'USD';
  
  // Try to create meaningful line items from bullets
  const meaningfulBullets = parsed.bullets.filter(b => 
    b.length > 10 && 
    !b.toLowerCase().includes('budget') &&
    !b.toLowerCase().includes('תקציב') &&
    !b.toLowerCase().includes('timeline')
  );

  if (meaningfulBullets.length >= 2) {
    // Create items from bullets
    const avgPrice = parsed.prices.length > 0
      ? parsed.prices.reduce((sum, p) => sum + (p.currency === currency ? p.amount : p.amount * (currency === 'ILS' ? 3.7 : 0.27)), 0) / parsed.prices.length
      : currency === 'ILS' ? 5000 : 1500;
    
    const pricePerItem = Math.round(avgPrice / meaningfulBullets.length / 100) * 100;
    
    meaningfulBullets.slice(0, 6).forEach((bullet, index) => {
      items.push({
        id: `item-${index + 1}`,
        description: bullet,
        quantity: 1,
        unit: parsed.detectedLanguage === 'he' ? 'יחידה' : 'unit',
        unitPrice: pricePerItem,
      });
    });
  } else {
    // Create default structure based on common web project items
    const isHebrew = parsed.detectedLanguage === 'he';
    const basePrice = parsed.prices.length > 0
      ? Math.max(...parsed.prices.filter(p => p.currency === currency).map(p => p.amount), 0)
      : currency === 'ILS' ? 5000 : 1500;

    const defaultItems = isHebrew ? [
      { desc: 'עיצוב ופיתוח אתר', price: basePrice * 0.5 },
      { desc: 'התאמה למובייל', price: basePrice * 0.15 },
      { desc: 'אינטגרציות ותוספים', price: basePrice * 0.2 },
      { desc: 'העלאה לאוויר והדרכה', price: basePrice * 0.15 },
    ] : [
      { desc: 'Website Design & Development', price: basePrice * 0.5 },
      { desc: 'Mobile Responsiveness', price: basePrice * 0.15 },
      { desc: 'Integrations & Plugins', price: basePrice * 0.2 },
      { desc: 'Launch & Training', price: basePrice * 0.15 },
    ];

    defaultItems.forEach((item, index) => {
      items.push({
        id: `item-${index + 1}`,
        description: item.desc,
        quantity: 1,
        unit: isHebrew ? 'יחידה' : 'unit',
        unitPrice: Math.round(item.price / 10) * 10,
      });
    });
  }

  return items;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
