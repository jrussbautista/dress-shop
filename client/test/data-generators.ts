import * as faker from 'faker';

import { Product, Banner, Category } from '@/types';

type Overrides = Record<string, any>;

export const productGenerator = (overrides?: Overrides): Product => {
  return {
    _id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    imageURL: faker.image.imageUrl(),
    price: Number(faker.commerce.price()),
    category: faker.lorem.word(1),
    description: faker.lorem.sentences(2),
    ...overrides,
  };
};

export const bannerGenerator = (overrides?: Overrides): Banner => {
  return {
    _id: faker.datatype.uuid(),
    imageURL: faker.image.imageUrl(),
    name: faker.commerce.productName(),
    ...overrides,
  };
};

export const categoryGenerator = (overrides?: Overrides): Category => {
  return {
    _id: faker.datatype.uuid(),
    imageURL: faker.image.imageUrl(),
    name: faker.commerce.productName(),
    ...overrides,
  };
};
