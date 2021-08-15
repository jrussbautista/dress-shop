import { render, screen } from '@testing-library/react';

import { productGenerator } from '@/test/data-generators';
import formatPrice from '@/utils/formatPrice';

import ProductCard from './ProductCard';

test('renders all the product information', () => {
  const fakeProduct = productGenerator();
  render(<ProductCard product={fakeProduct} />);

  expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();
  expect(screen.getByText(formatPrice(fakeProduct.price))).toBeInTheDocument();
  expect(screen.getByAltText(fakeProduct.name)).toBeInTheDocument();
});
