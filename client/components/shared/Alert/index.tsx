import React from 'react';

interface Props {
  type: string;
  message: string | null;
}

export const Alert: React.FC<Props> = ({ type, message }) => {
  return (
    <>
      <div className={`alert alert-${type}`} role={type}>
        {message}
      </div>
      <style jsx>
        {`
          .alert {
            padding: 1.5rem 1rem;
            border-radius: 6px;
            font-size: 1.6rem;
          }

          .alert-error {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
          }
        `}
      </style>
    </>
  );
};
