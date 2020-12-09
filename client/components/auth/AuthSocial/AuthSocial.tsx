import React, { useState } from 'react';
import { Button, PageLoader } from 'components/ui';
import { IconGoogle } from 'components/icons';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from 'utils/constants';
import { useAuth, useToast } from 'contexts';

interface GoogleError {
  error: string;
  details: string;
}

const AuthSocial: React.FC = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { loginWithGoogle } = useAuth();
  const { setToast } = useToast();

  const handleOnSuccess = async (response: any): Promise<void> => {
    try {
      setIsLoggingIn(true);
      const tokenId = response.tokenId;
      await loginWithGoogle(tokenId);
    } catch (error) {
      setToast('error', error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleOnFailure = (response: GoogleError) => {
    if (response.error === 'popup_closed_by_user') return;
    setToast('error', response.details);
  };

  return (
    <>
      {isLoggingIn && <PageLoader />}
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
    </>
  );
};

export default AuthSocial;
