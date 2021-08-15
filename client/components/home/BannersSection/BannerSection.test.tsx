import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { fakeBanners } from '@/test/fake-data';

import BannersSection from './BannersSection';

test('diplay list of banner items', async () => {
  render(<BannersSection />);

  expect(screen.getByLabelText('Banners loading')).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByLabelText('Banners loading'));

  fakeBanners.forEach((banner) => {
    expect(screen.getByAltText(banner.name)).toBeInTheDocument();
    expect(screen.getByAltText(banner.name)).toHaveAttribute('src', banner.imageURL);
  });
});
