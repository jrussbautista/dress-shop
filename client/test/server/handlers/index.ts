import { bannersHandlers } from './banners';
import { categoriesHandlers } from './categories';
import { productsHandlers } from './products';

export const handlers = [...productsHandlers, ...categoriesHandlers, ...bannersHandlers];
