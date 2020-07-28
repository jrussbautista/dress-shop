import React from 'react';
import { useRouter } from 'next/router';
import { LoginForm, SignUpForm, AuthSocial } from '../features/Auth';
import { AuthLink } from '../features/Auth/AuthLink';

const Auth = () => {
  const { query } = useRouter();
  const type = query.type as string;

  const authElement = type === 'login' ? <LoginForm /> : <SignUpForm />;

  return (
    <>
      <>
        <div className="auth-container">
          {authElement}
          <AuthLink type={type} />
          <div className="or">
            <span className="line"></span>
            <span className="text">or</span>
            <span className="line"></span>
          </div>
          <AuthSocial />
        </div>
        <style jsx>{`
          .auth-container {
            width: 50rem;
            margin: 0 auto;
          }

          .or {
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .or .line {
            flex: 1;
            background: rgb(232, 233, 234);
            color: rgb(134, 144, 153);
            height: 1px;
          }

          .or .text {
            padding: 0 1rem;
          }
        `}</style>
      </>
    </>
  );
};

export default Auth;
