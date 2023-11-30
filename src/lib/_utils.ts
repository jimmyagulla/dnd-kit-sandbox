import { TreeItems } from 'dnd-kit-sortable-tree';

import { Quote, Item } from '../types';

export const convertQuotesToTreeItems = (quotes: Quote[]): TreeItems<Quote> => {
  return quotes.map(quote => ({
    ...quote,
    id: quote.level.toString(),
    children: quote.children ? convertQuotesToTreeItems(quote.children) : []
  }));
};

export const addQuotesKeys = (quotes: Quote[], depth: number = 0): Item[] => {
  return quotes.map(quote => ({
    ...quote,
    children: quote.children ? addQuotesKeys(quote.children, depth + 1) : undefined,
    key: quote.level,
    depth,
  }));
};
