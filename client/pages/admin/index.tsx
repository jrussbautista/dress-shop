import React from 'react';
import { useRouter } from 'next/router';
import { Dashboard, Products } from 'components/admin';
import { useAuth } from 'contexts';
import { Alert } from 'components/shared';

const Admin: React.FC = () => {
  const { currentUser } = useAuth();
  const { query } = useRouter();
  const selectedPage = query.selected_page || 'dashboard';

  const renderSection = () => {
    switch (selectedPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      default:
        return null;
    }
  };

  if (currentUser?.role !== 'admin') {
    return <Alert message="You are not allowed to visit this page" type="error" />;
  }

  return (
    <>
      <div>{renderSection()}</div>
    </>
  );
};

export default Admin;
