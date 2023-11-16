import { faker } from '@faker-js/faker';

import { Quotation } from '@/types';

let quotations: Quotation[] = [];

quotations = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: index,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    number: faker.number.int().toString(),
    organizationId: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    clientId: faker.database.mongodbObjectId(),
    siteId: faker.database.mongodbObjectId(),
    annotation: faker.lorem.sentence(),
    title: faker.lorem.sentence(),
    executionDelayId: faker.database.mongodbObjectId(),
    offerValidityId: faker.database.mongodbObjectId(),
    signatoryId: faker.database.mongodbObjectId(),
    paymentTermsId: faker.database.mongodbObjectId(),
    typeQuotationId: faker.database.mongodbObjectId(),
  }))

export const getQuotations = (): Quotation[] => quotations;
