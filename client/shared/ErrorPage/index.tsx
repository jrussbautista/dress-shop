import React from 'react';
import { Alert } from '../Alert';

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
          <button type="button" className="btn" onClick={handleRefresh}>
            Refresh Page
          </button>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 120rem;
          margin: 3rem auto;
          text-align: center;
        }

        .btn {
          margin-top: 2em;
          background-color: var(--color-dark);
          color: #fff;
          width: 200px;
          height: 50px;
          line-height: 50px;
          font-size: 17px;
          border: 1px solid var(--color-dark);
          display: inline-block;
        }
      `}</style>
    </>
  );
};
