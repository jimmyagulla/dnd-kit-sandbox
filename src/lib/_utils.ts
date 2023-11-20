import { TreeItems } from 'dnd-kit-sortable-tree';

import { Quote } from '../types';

export const convertQuotesToTreeItems = (quotes: Quote[]): TreeItems<Quote> => {
  return quotes.map(quote => ({
    ...quote,
    id: quote.id.toString(),
    children: quote.children ? convertQuotesToTreeItems(quote.children) : [],
  }));
};