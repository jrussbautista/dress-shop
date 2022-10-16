import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Spinner } from '@/components/ui';
import useUser from '@/hooks/user/useUser';

const styles = {
  container: {
    marginTop: 60,
  },
};

const WithAuth = (Component: React.ComponentType) => {
  const MyComponent = () => {
    const { data: currentUser, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !currentUser) {
        router.push('/login');
      }
    }, [currentUser, isLoading, router]);

    if (currentUser) {
      return <Component />;
    }

    return (
      <div style={styles.container}>
        <Spinner size={40} />
      </div>
    );
  };

  return MyComponent;
};

export default WithAuth;
