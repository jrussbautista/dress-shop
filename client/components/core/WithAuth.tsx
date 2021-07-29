import React, { useEffect } from 'react';
import { useAuth } from 'contexts';
import { useRouter } from 'next/router';
import { Spinner } from '@/components/ui';

const styles = {
  container: {
    marginTop: 60,
  },
};

const WithAuth = (Component: React.ComponentType): React.FC => () => {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [loading]);

  if (isAuthenticated) {
    return <Component />;
  }

  return (
    <div style={styles.container}>
      <Spinner size={40} />
    </div>
  );
};

export default WithAuth;
