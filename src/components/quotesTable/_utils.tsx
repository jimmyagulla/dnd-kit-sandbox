import { Nullable, Quote } from '../../types';

export const getQuoteTotal = (quote: Quote): Nullable<number> => {
  const { quantity, htUnitPrice } = quote;

  if (!quantity || !htUnitPrice) {
    return null;
  }

  return quantity * htUnitPrice;
};
