import { useEffect } from 'react';

let cachedScrollPositions: any = [];
import Router from 'next/router';

export const useScrollRestoration = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
      let shouldScrollRestore: any;

      Router.events.on('routeChangeStart', () => {
        cachedScrollPositions.push([window.scrollX, window.scrollY]);
      });

      Router.events.on('routeChangeComplete', () => {
        if (shouldScrollRestore) {
          const { x, y } = shouldScrollRestore;
          window.scrollTo(x, y);
          shouldScrollRestore = false;
        }
      });

      Router.beforePopState(() => {
        const [x, y] = cachedScrollPositions.pop();
        shouldScrollRestore = { x, y };

        return true;
      });
    }
  }, []);
};
