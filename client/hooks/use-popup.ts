import { useState, useEffect } from 'react';

interface PopUp {
  isOpen: boolean;
  showToast(): void;
  toggle(): void;
}

export const usePopUp = (): PopUp => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 3000);
    // clear time out when component unmount
    return () => clearTimeout(timeout);
  }, [isOpen]);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function showToast() {
    setIsOpen(true);
  }

  return { isOpen, showToast, toggle };
};
