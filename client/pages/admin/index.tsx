import React from 'react';
import { useRouter } from 'next/router';
import { Dashboard, Products, Users } from 'components/domain/Admin';
import { useAuth } from 'store';
import { Alert } from 'components/shared';

const Admin: React.FC = () => {
  const { currentUser } = useAuth();
  const { query } = useRouter();
  const selectedPage = query.selected_page || 'dashboard';

  const renderPage = () => {
    switch (selectedPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'users':
        return <Users />;
      default:
        return null;
    }
  };

  if (currentUser?.role !== 'admin') {
    return <Alert message="You are not allowed to visit this page" type="error" />;
  }

  return (
    <>
      <div>{renderPage()}</div>
    </>
  );
};

export default Admin;
