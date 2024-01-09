const { faker } = require('@faker-js/faker');

const MAX_DEPTH = 1;
const MAX_QUOTES_NUMBER = 3;

const generateQuote = (prevLevel, currentLevel, currentDepth) => {
  const level =
    currentDepth === MAX_DEPTH
      ? `${prevLevel}`
      : `${prevLevel}.${currentLevel}`;

  let children = null;

  if (currentDepth) {
    const childrenNumber = faker.datatype.number({ min: 0, max: 2 });
    children = Array.from({ length: childrenNumber }, (_, index) =>
      generateQuote(level, index + 1, currentDepth - 1),
    );
  }

  return {
    id: level,
    level,
    children,
    designation: faker.lorem.words(),
    htUnitPrice: faker.datatype.number({ min: 1, max: 10000 }),
    quantity: faker.datatype.number({ min: 1, max: 10 }),
    unit: faker.lorem.word(),
    total: faker.datatype.number({ min: 1, max: 10000 }),
    tva: faker.datatype.number({ min: 1, max: 50 }),
  };
};

export const quotes = Array.from({ length: MAX_QUOTES_NUMBER }, (_, index) =>
  generateQuote(String(index + 1), index, MAX_DEPTH),
);