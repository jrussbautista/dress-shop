import { useEffect } from 'react';

interface IShouldRestore {
  x: number;
  y: number;
}

const cachedScrollPositions: any = [];
import Router from 'next/router';

export const useScrollRestoration = (): void => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
      let shouldScrollRestore: IShouldRestore | null;

      Router.events.on('routeChangeStart', () => {
        cachedScrollPositions.push([window.scrollX, window.scrollY]);
      });

      Router.events.on('routeChangeComplete', () => {
        if (shouldScrollRestore) {
          const { x, y } = shouldScrollRestore;
          window.scrollTo(x, y);
          shouldScrollRestore = null;
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
