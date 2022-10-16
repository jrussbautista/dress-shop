import Router from 'next/router';
import React from 'react';

import { userGenerator } from '@/test/data-generators';
import { fireEvent, render, screen, userEvent, waitFor } from '@/test/test-utils';

import SignUpForm from './SignUpForm';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

describe('<SignupForm />', () => {
  test('successfully register user and navigated to profile page', async () => {
    render(<SignUpForm />);
    const fields = userGenerator();

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    userEvent.type(nameInput, fields.name);
    userEvent.type(emailInput, fields.email);
    userEvent.type(passwordInput, fields.password);

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(submitButton).toBeDisabled());
    await waitFor(() => expect(submitButton).toBeEnabled());
    expect(Router.push).toHaveBeenCalledWith('/profile');
  });

  test('display input fields error when input fields is empty on form submit', async () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    userEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('Email is required')).toBeInTheDocument());
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });
});
