import { Quote, SavedRating } from '../types';

const QUOTES_KEY = 'wc_quotes';
const RATINGS_KEY = 'wc_ratings';

export function saveQuote(quote: Quote): void {
  const quotes = getQuotes();
  quotes.push(quote);
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

export function getQuotes(): Quote[] {
  const stored = localStorage.getItem(QUOTES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveRating(rating: SavedRating): void {
  const ratings = getRatings();
  ratings.push(rating);
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
}

export function getRatings(): SavedRating[] {
  const stored = localStorage.getItem(RATINGS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function updateQuoteStatus(quoteId: string, status: Quote['status']): void {
  const quotes = getQuotes();
  const updatedQuotes = quotes.map(quote => 
    quote.id === quoteId ? { ...quote, status } : quote
  );
  localStorage.setItem(QUOTES_KEY, JSON.stringify(updatedQuotes));
}