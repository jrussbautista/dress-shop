import { authHandlers } from './auth';
import { bannersHandlers } from './banners';
import { cartHandlers } from './cart';
import { categoriesHandlers } from './categories';
import { productsHandlers } from './products';
import { wishlistHandlers } from './wishlist';

export const handlers = [
  ...productsHandlers,
  ...categoriesHandlers,
  ...bannersHandlers,
  ...authHandlers,
  ...wishlistHandlers,
  ...cartHandlers,
];
