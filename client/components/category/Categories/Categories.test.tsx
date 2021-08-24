import { categoryGenerator } from '@/test/data-generators';
import { render, screen } from '@/test/test-utils';

import Categories from './Categories';

test('renders list of categories', () => {
  const fakeCategories = [categoryGenerator(), categoryGenerator()];
  render(<Categories categories={fakeCategories} />);

  fakeCategories.forEach((category) => {
    expect(screen.getByText(category.name)).toBeInTheDocument();
    expect(screen.getByAltText(category.name)).toBeInTheDocument();
    expect(screen.getByAltText(category.name)).toBeInTheDocument();
  });
});
