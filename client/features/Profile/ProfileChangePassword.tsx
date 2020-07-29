import React, { useState } from 'react';
import { Button, PageLoader } from '../../shared';
import { useToast } from '../../store';
import { AuthService } from '../../services';
import { parseCookies } from 'nookies';

export const ProfileChangePassword: React.FC = () => {
  const { setToast } = useToast();

  const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const [password, setPassword] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.newPassword || !password.oldPassword) {
      setToast('error', 'Please the provide password field.');
      return;
    }

    if (password.newPassword !== password.confirmNewPassword) {
      setToast('error', 'New Password and Confirm Password does not match');
      return;
    }

    handleChangePassword();
  };

  const handleChangePassword = async () => {
    try {
      setSubmitting(true);
      const { token } = parseCookies({});
      await AuthService.changePassword(token, password);
      setPassword(initialState);
      setToast('success', 'Successfully password changed');
    } catch (error) {
      setToast('error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <>
      {submitting && <PageLoader />}
      <div className="container">
        <h2> Change Password </h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="user-details">
            <div className="group">
              <label htmlFor="oldPassword" className="label">
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={password.oldPassword}
                onChange={handleChange}
                autoComplete="false"
              />
            </div>
            <div className="group">
              <label htmlFor="newPassword" className="label">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handleChange}
                autoComplete="false"
              />
            </div>
            <div className="group">
              <label htmlFor="confirmNewPassword" className="label">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={password.confirmNewPassword}
                onChange={handleChange}
                autoComplete="false"
              />
            </div>
            <div className="group bottom">
              <Button type="submit" title="Save Password" disabled={submitting} />
            </div>
          </div>
        </form>
      </div>
      <style jsx>{`
        .container {
          padding: 1rem 0;
        }

        .group {
          margin: 1rem 0;
        }

        .bottom {
          margin-top: 3rem;
        }

        .label {
          display: block;
          margin-bottom: 0.5rem;
          color: #9c99b6;
          font-size: 1.7rem;
        }

        .group input {
          border: 1px solid transparent;
          border-bottom: 1px solid var(--color-dark);
          width: 100%;
          height: 5rem;
          font-size: 1.7rem;
        }
      `}</style>
    </>
  );
};
