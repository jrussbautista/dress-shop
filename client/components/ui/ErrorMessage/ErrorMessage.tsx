import React from 'react';

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

import styles from './ErrorMessage.module.css';

interface Props {
  message: string;
}

const ErrorPage = ({ message }: Props) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Container>
        <Alert type="error" message={message} />
        <div className={styles.buttonContainer}>
          <Button type="button" onClick={handleRefresh} title="Refresh Page" />
        </div>
      </Container>
    </>
  );
};

export default ErrorPage;
