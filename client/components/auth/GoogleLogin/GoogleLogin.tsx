import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoogleLogin as GoogleLoginLib } from 'react-google-login';

import { IconGoogle } from '@/components/icons';
import { Button, PageLoader } from '@/components/ui';
import { GOOGLE_CLIENT_ID } from '@/constants';
import { useToast } from '@/contexts';
import useGoogleLogin from '@/hooks/auth/use-google-login';

interface GoogleError {
  error: string;
  details: string;
}

const GoogleLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const googleLogin = useGoogleLogin();
  const { setToast } = useToast();
  const { query } = useRouter();
  const ref = query.ref as string;

  const handleOnSuccess = async (response: any): Promise<void> => {
    try {
      setIsLoggingIn(true);
      const tokenId = response.tokenId;
      await googleLogin(tokenId);
      setIsLoggingIn(false);
      if (ref) {
        Router.push(`/products/${ref}`);
      } else {
        Router.push('/profile');
      }
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
        <GoogleLoginLib
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

export default GoogleLogin;
