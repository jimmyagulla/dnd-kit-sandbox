import { TreeItems } from 'dnd-kit-sortable-tree';

import { Quote } from '../types';

export const convertQuotesToTreeItems = (quotes: Quote[]): TreeItems<Quote> => {
  return quotes.map(quote => ({
    ...quote,
    id: quote.id.toString(),
    children: quote.children ? convertQuotesToTreeItems(quote.children) : []
  }));
};

interface QuoteColumn {
  label: string;
  prop: keyof Quote;
  style: object;
}

export const getQuoteColumns = (): QuoteColumn[] => {
  return [
    {
      label: "Niv",
      prop: "id",
      style: { width: "100px" },
    },
    {
      label: "Désignation",
      prop: "designation",
      style: { flex: 1, maxWidth: "300px" },
    },
    {
      label: "Qté",
      prop: "quantity",
      style: { width: "100px" },
    },
    {
      label: "Unité",
      prop: "unit",
      style: { width: "50px" },
    },
    {
      label: "Total",
      prop: "total",
      style: { width: "100px" },
    },
    {
      label: "TVA",
      prop: "tva",
      style: { width: "100px" },
    }
  ]
}

export const defaultQuoteColumnStyle = {
  borderLeft: "1px solid #ebeef5",
  height: "100%",
  paddingLeft: "10px",
}