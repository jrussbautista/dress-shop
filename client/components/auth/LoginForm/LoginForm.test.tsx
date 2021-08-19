import Router from 'next/router';
import React from 'react';

import { AuthProvider } from '@/contexts/auth';
import { ToastProvider } from '@/contexts/toast';
import { userGenerator } from '@/test/data-generators';
import { rtlRender, screen, userEvent, waitFor } from '@/test/test-utils';

import LoginForm from './LoginForm';

const Wrapper: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

const render = (ui: React.ReactElement) => {
  return rtlRender(ui, { wrapper: Wrapper });
};

test('successfully login user and navigated to profile page', async () => {
  render(<LoginForm />);
  const fields = userGenerator();

  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  userEvent.type(emailInput, fields.email);
  userEvent.type(passwordInput, fields.password);

  const submitButton = screen.getByRole('button', { name: /log in/i });

  await waitFor(() => userEvent.click(submitButton));

  expect(submitButton).toBeDisabled();

  await waitFor(() => expect(submitButton).toBeEnabled());

  expect(Router.push).toBeCalledWith('/profile');
});

test('display input fields error when input fields is empty on form submit', async () => {
  render(<LoginForm />);

  const submitButton = screen.getByRole('button', { name: /log in/i });

  userEvent.click(submitButton);

  await waitFor(() => expect(screen.getByText('Email is required')).toBeInTheDocument());

  expect(screen.getByText('Password is required')).toBeInTheDocument();
});
