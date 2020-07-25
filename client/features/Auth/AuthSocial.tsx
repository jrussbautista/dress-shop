import React from 'react';
import { Button, IconGoogle } from '../../shared';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../utils/constants';
import { AuthService } from '../../services';
import { useAuth, useToast } from '../../store';

export const AuthSocial = () => {
  const { setCurrentUser } = useAuth();
  const { setToast } = useToast();

  const handleOnSuccess = async (response: any) => {
    try {
      const { user, token } = await AuthService.verifyGoogleIdToken(
        response.tokenId
      );
      setCurrentUser(user, token);
    } catch (error) {
      setToast('error', error.message);
    }
  };

  const handleOnFailure = (response: any) => {
    console.log(response);
  };

  return (
    <>
      <div className="container">
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleOnSuccess}
          onFailure={handleOnFailure}
          cookiePolicy={'single_host_origin'}
          render={(renderProps) => (
            <Button
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              icon={<IconGoogle />}
              title="Login with Google"
              variant="light"
              style={{ width: '100%' }}
            />
          )}
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
