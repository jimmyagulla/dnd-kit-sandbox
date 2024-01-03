import { faker } from '@faker-js/faker';

import { Quote } from '../types';

export const getQuotes = (quotesNumber: number = 5, depth: number = 2): Quote[] => {
  const generateQuote = (prevLevel: string, currentLevel: number, currentDepth: number): Quote => {
    const level = currentDepth === depth ? `${prevLevel}` : `${prevLevel}.${currentLevel}`;

    if (currentDepth === 0) {
      return {
        id: 0,
        level,
        children: [],
        designation: faker.lorem.words({ min: 1, max: 5 }),
        htUnitPrice: faker.number.int({ min: 1, max: 10000 }),
        quantity: faker.number.int({ min: 1, max: 10 }),
        unit: faker.lorem.word(),
        total: faker.number.int({ min: 1, max: 10000 }),
        tva: faker.number.int({ min: 1, max: 50 }),
      };
    }

    const childrenNumber = faker.number.int({ min: 0, max: 2 });
    const children = Array.from({ length: childrenNumber }, (_, index) => generateQuote(`${level}`, currentLevel++, currentDepth - 1));

    return {
      id: 0,
      level,
      children,
      designation: faker.lorem.words({ min: 1, max: 5 }),
      htUnitPrice: faker.number.int({ min: 1, max: 10000 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      unit: faker.lorem.word(),
      total: faker.number.int({ min: 1, max: 10000 }),
      tva: faker.number.int({ min: 1, max: 50 }),
    };
  };

  return Array.from({ length: quotesNumber }, (_, index) => generateQuote(String(index + 1), 1, depth));
};
