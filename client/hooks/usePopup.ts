import { useState } from 'react';

export const usePopUp = () => {
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
