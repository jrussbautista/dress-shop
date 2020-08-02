import React from 'react';
import { Alert } from '../Alert';
import { Button } from '../Button';

interface Props {
  message: string;
}

export const ErrorPage: React.FC<Props> = ({ message }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <div className="msg">
          <Alert type="error" message={message} />
          <Button
            type="button"
            onClick={handleRefresh}
            title="Refresh Page"
            style={{ marginTop: 20 }}
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 120rem;
          margin: 3rem auto;
          text-align: center;
          padding: 0 1rem;
        }
      `}</style>
    </>
  );
};
