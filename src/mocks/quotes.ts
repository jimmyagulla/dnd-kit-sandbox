import { faker } from '@faker-js/faker';

import { Quote } from '../types';

const generateQuote = (id: number): Quote => {
  return {
    id,
    children: Array(faker.number.int({ min: 1, max: 5 }))
      .fill(null)
      .map((_, i) => generateQuote(i)),
    designation: faker.lorem.words({ min: 1, max: 5 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    unity: faker.lorem.word(),
    total: faker.number.int({ min: 1, max: 10000 }),
    tva: faker.number.int({ min: 1, max: 50 }),
  }
};

export const getQuotes = (quotesNumber: number = 10): Quote[] => {
  let quotes = [];
  
  for (let i = 0; i < quotesNumber; i++) {
    quotes.push(generateQuote(i));
  }

  return quotes;
};
