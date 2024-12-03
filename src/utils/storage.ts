import { Quote, SavedRating } from '../types';
import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

interface DBQuote {
  id: string;
  user_id: string;
  quote_number: string;
  business_info: any;
  premium: number;
  effective_date: string;
  expiration_date: string;
  status: string;
  created_at: string;
  issued_at?: string;
  bound_at?: string;
  notes?: string;
  rating_id: string;
}

interface DBRating {
  id: string;
  user_id: string;
  business_info: any;
  saved_at: string;
  total_premium: number;
  status: string;
}

function toDBQuote(quote: Quote, userId: string): Omit<DBQuote, 'created_at'> {
  return {
    id: quote.id,
    user_id: userId,
    quote_number: quote.quoteNumber,
    business_info: quote.businessInfo,
    premium: quote.premium,
    effective_date: quote.effectiveDate,
    expiration_date: quote.expirationDate,
    status: quote.status,
    issued_at: quote.issuedAt,
    bound_at: quote.boundAt,
    notes: quote.notes,
    rating_id: quote.ratingId
  };
}

function fromDBQuote(dbQuote: DBQuote): Quote {
  return {
    id: dbQuote.id,
    quoteNumber: dbQuote.quote_number,
    businessInfo: dbQuote.business_info,
    premium: dbQuote.premium,
    effectiveDate: dbQuote.effective_date,
    expirationDate: dbQuote.expiration_date,
    status: dbQuote.status as Quote['status'],
    createdAt: dbQuote.created_at,
    issuedAt: dbQuote.issued_at,
    boundAt: dbQuote.bound_at,
    notes: dbQuote.notes,
    ratingId: dbQuote.rating_id
  };
}

function toDBRating(rating: SavedRating, userId: string): DBRating {
  return {
    id: rating.id,
    user_id: userId,
    business_info: rating.businessInfo,
    saved_at: rating.savedAt,
    total_premium: rating.totalPremium,
    status: rating.status
  };
}

function fromDBRating(dbRating: DBRating): SavedRating {
  return {
    id: dbRating.id,
    businessInfo: dbRating.business_info,
    savedAt: dbRating.saved_at,
    totalPremium: dbRating.total_premium,
    status: dbRating.status as SavedRating['status']
  };
}

export async function saveQuote(quote: Quote, user: User): Promise<void> {
  const { error } = await supabase
    .from('quotes')
    .insert([toDBQuote(quote, user.id)]);

  if (error) {
    console.error('Error saving quote:', error);
    throw error;
  }
}

export async function getQuotes(user: User): Promise<Quote[]> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }

  return (data || []).map(fromDBQuote);
}

export async function saveRating(rating: SavedRating, user: User): Promise<void> {
  const { error } = await supabase
    .from('ratings')
    .insert([toDBRating(rating, user.id)]);

  if (error) {
    console.error('Error saving rating:', error);
    throw error;
  }
}

export async function getRatings(user: User): Promise<SavedRating[]> {
  const { data, error } = await supabase
    .from('ratings')
    .select('*')
    .eq('user_id', user.id)
    .order('saved_at', { ascending: false });

  if (error) {
    console.error('Error fetching ratings:', error);
    throw error;
  }

  return (data || []).map(fromDBRating);
}

export async function updateQuoteStatus(
  quoteId: string, 
  status: Quote['status'],
  user: User
): Promise<void> {
  const { error } = await supabase
    .from('quotes')
    .update({ status })
    .eq('id', quoteId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error updating quote status:', error);
    throw error;
  }
}