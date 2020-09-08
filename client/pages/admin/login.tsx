import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Meta, Button, PageLoader, Input } from 'components/shared';
import { useAuth, useToast } from 'store';
import { AuthService } from 'services';

const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(6),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const AdminLogin: React.FC = () => {
  const { login } = useAuth();

  const { setToast } = useToast();

  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <Meta title="Log In" />
      {submitting && <PageLoader />}
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={({ email, password }) => {
          AuthService.login(email, password)
            .then(({ user, token }) => {
              if (user.role !== 'admin') {
                throw new Error('You are not authorize to access this page');
              }
              login(user, token, true);
            })
            .catch((error) => {
              setToast('error', error.message);
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="page-heading"> Admin Login </h1>
            <Input
              label
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              type="email"
              error={Boolean(errors.email && touched.email)}
            />
            {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
            <Input
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              type="password"
              error={Boolean(errors.password && touched.password)}
            />
            {errors.password && touched.password ? (
              <div className="error">{errors.password}</div>
            ) : null}

            <div className="bottom">
              <Button
                type="submit"
                title="Log In"
                disabled={submitting}
                style={{
                  width: '100%',
                  fontSize: '1.8rem',
                  backgroundColor: 'var(--color-dark)',
                }}
              />
            </div>
          </form>
        )}
      </Formik>
      <style jsx>
        {`
          .page-heading {
            font-size: 3rem;
            text-transform: uppercase;
          }

          .auth-form {
            padding: 2rem 0;
            margin: 0 auto;
            max-width: 500px;
          }

          .bottom {
            margin-top: 2rem;
          }

          .error {
            color: red;
            font-size: 1.6rem;
            padding: 0.2rem 0;
          }

          @media only screen and (max-width: 600px) {
            .auth-form {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default AdminLogin;
