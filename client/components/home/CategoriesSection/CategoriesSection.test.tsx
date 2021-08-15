import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { fakeCategories } from '@/test/fake-data';

import CategoriesSection from './CategoriesSection';

test('diplay list of category items', async () => {
  render(<CategoriesSection />);

  expect(screen.getByLabelText('Categories loading')).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByLabelText('Categories loading'));

  fakeCategories.forEach((category) => {
    expect(screen.getByAltText(category.name)).toBeInTheDocument();
    expect(screen.getByAltText(category.name)).toHaveAttribute('src', category.imageURL);
  });
});
