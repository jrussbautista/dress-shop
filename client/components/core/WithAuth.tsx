import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Spinner } from '@/components/ui';
import { useAuth } from 'contexts';

const styles = {
  container: {
    marginTop: 60,
  },
};

const WithAuth = (Component: React.ComponentType) => {
  const MyComponent = () => {
    const { loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/auth');
      }
    }, [isAuthenticated, loading, router]);

    if (isAuthenticated) {
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
