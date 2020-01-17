import { useState, useEffect } from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // remove alert when unmount
    return () => setAlert(null);
  }, []);

  return { alert, setAlert };
};

export default useAlert;
