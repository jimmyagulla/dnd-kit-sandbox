import { faker } from '@faker-js/faker';

import { Quote } from '../types';

export const getQuotes = (quotesNumber: number = 5, depth: number = 2): Quote[] => {
  const generateQuote = (level: string, currentId: number, currentDepth: number): Quote => {
    const id = currentDepth === depth ? `${level}` : `${level}.${currentId}`;
    console.log('level | currentId | currentDepth', level, currentId, currentDepth, ' -> ', id);

    if (currentDepth === 0) {
      return {
        id,
        children: [],
        designation: faker.lorem.words({ min: 1, max: 5 }),
        quantity: faker.number.int({ min: 1, max: 10 }),
        unity: faker.lorem.word(),
        total: faker.number.int({ min: 1, max: 10000 }),
        tva: faker.number.int({ min: 1, max: 50 }),
      };
    }

    const childrenNumber = faker.number.int({ min: 0, max: 2 });
    const children = Array.from({ length: childrenNumber }, (_, index) => generateQuote(`${id}`, currentId++, currentDepth - 1));

    return {
      id,
      children,
      designation: faker.lorem.words({ min: 1, max: 5 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      unity: faker.lorem.word(),
      total: faker.number.int({ min: 1, max: 10000 }),
      tva: faker.number.int({ min: 1, max: 50 }),
    };
  };

  return Array.from({ length: quotesNumber }, (_, index) => generateQuote(String(index + 1), 1, depth));
};
