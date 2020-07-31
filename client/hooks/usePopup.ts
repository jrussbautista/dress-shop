import { useState } from 'react';

interface PopUp {
  isOpen: boolean;
  showToast(): void;
  toggle(): void;
}

export const usePopUp = (): PopUp => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function showToast() {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  }

  return { isOpen, showToast, toggle };
};
