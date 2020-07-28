import React from 'react';
import Link from 'next/link';

interface Props {
  type: string;
}

export const AuthLink: React.FC<Props> = ({ type }) => {
  return (
    <>
      {type === 'login' ? (
        <div className="link">
          Don't have an account?
          <Link href="/auth?type=register">
            <a className="link link-text"> Create an account.</a>
          </Link>
        </div>
      ) : (
        <div className="link">
          Already have an account?
          <Link href="/auth?type=login">
            <a className="link link-text"> Login your account.</a>
          </Link>
        </div>
      )}
      <style jsx>{`
        .link {
          margin-top: 2rem;
          color: var(--color-dark);
          font-size: 1.7rem;
          text-align: center;
        }

        .link-text {
          color: var(--color-primary);
        }
      `}</style>
    </>
  );
};
