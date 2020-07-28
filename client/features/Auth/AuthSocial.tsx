import React from 'react';
import { Button, IconGoogle } from '../../shared';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../utils/constants';
import { AuthService } from '../../services';
import { useAuth, useToast } from '../../store';

interface GoogleError {
  error: string;
  details: string;
}

export const AuthSocial = () => {
  const { setCurrentUser } = useAuth();
  const { setToast } = useToast();

  const handleOnSuccess = async (response: any): Promise<void> => {
    try {
      const tokenId = response.tokenId;
      const { user, token } = await AuthService.verifyGoogleIdToken(tokenId);
      setCurrentUser(user, token);
    } catch (error) {
      setToast('error', error.message);
    }
  };

  const handleOnFailure = (response: GoogleError) => {
    if (response.error === 'popup_closed_by_user') return;
    setToast('error', response.details);
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
