import LZString from 'lz-string';
import { OfferData } from './types';

const STORAGE_KEY = 'forge_offers';

export function saveOffer(offer: OfferData): void {
  if (typeof window === 'undefined') return;
  
  const offers = getOffers();
  const existingIndex = offers.findIndex(o => o.id === offer.id);
  
  if (existingIndex >= 0) {
    offers[existingIndex] = offer;
  } else {
    offers.push(offer);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
}

export function getOffer(id: string): OfferData | null {
  if (typeof window === 'undefined') return null;
  
  const offers = getOffers();
  return offers.find(o => o.id === id) || null;
}

export function getOffers(): OfferData[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteOffer(id: string): void {
  if (typeof window === 'undefined') return;
  
  const offers = getOffers().filter(o => o.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
}

export function compressOffer(offer: OfferData): string {
  const json = JSON.stringify(offer);
  return LZString.compressToEncodedURIComponent(json);
}

export function decompressOffer(compressed: string): OfferData | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(compressed);
    if (!json) return null;
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function generateShareableUrl(offer: OfferData, baseUrl: string): string {
  const compressed = compressOffer(offer);
  return `${baseUrl}/offer/?data=${compressed}`;
}
