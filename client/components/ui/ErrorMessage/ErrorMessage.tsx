import React from 'react';

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

interface Props {
  message: string;
}

const ErrorPage: React.FC<Props> = ({ message }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Container>
        <Alert type="error" message={message} />
        <Button
          type="button"
          onClick={handleRefresh}
          title="Refresh Page"
          style={{ marginTop: 20 }}
        />
      </Container>
    </>
  );
};

export default ErrorPage;
