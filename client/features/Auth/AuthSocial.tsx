import React from 'react';
import { Button, IconGoogle } from '../../shared';
import { GOOGLE_LOGIN_URL } from '../../utils/constants';

export const AuthSocial = () => {
  const handleOpenLogin = () => {
    window.open(GOOGLE_LOGIN_URL, '_self');
  };

  return (
    <>
      <div className="container">
        <Button
          type="button"
          onClick={handleOpenLogin}
          icon={<IconGoogle />}
          title="Login with Google"
          variant="light"
          style={{ width: '100%' }}
        />
      </div>
      <style jsx>
        {`
          .container {
            margin: 1rem 0;
          }
        `}
      </style>
    </>
  );
};
