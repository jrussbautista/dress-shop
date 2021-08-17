import { render, screen } from '@testing-library/react';

import AuthLink from './AuthLink';

test('correctly display content based on current type', () => {
  const { rerender } = render(<AuthLink type="login" />);
  expect(screen.getByRole('link', { name: /create an account./i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /create an account./i })).toHaveAttribute(
    'href',
    '/auth?type=register'
  );

  rerender(<AuthLink type="register" />);
  expect(screen.getByRole('link', { name: /login your account./i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /login your account./i })).toHaveAttribute(
    'href',
    '/auth?type=login'
  );
});
