import { Quote, Item } from '../types';

export const addQuotesKeys = (quotes: Quote[], depth: number = 0): Item[] => {
  return quotes.map(quote => ({
    ...quote,
    children: quote.children ? addQuotesKeys(quote.children, depth + 1) : undefined,
    key: String(quote?.level),
    depth,
  }));
};

export const currencyFormat = (num: number): string => {
  const usFormatter = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
  });

  return usFormatter.format(Number(num.toFixed(2)));
};
