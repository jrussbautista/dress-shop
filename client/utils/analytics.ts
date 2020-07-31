import ReactGA from 'react-ga';

export const initGA = (): void => {
  ReactGA.initialize('UA-145462597-3');
};

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
export const logEvent = (category: string, action: string): void => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};
export const logException = (description: string, fatal = false): void => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
