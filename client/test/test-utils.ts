import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppProviders } from '@/contexts/AppProviders';

// eslint-disable-next-line import/export
export const render = (ui: React.ReactElement, { ...options }: Record<string, any> = {}) => {
  return rtlRender(ui, { wrapper: AppProviders, ...options });
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';

export { userEvent, rtlRender };
