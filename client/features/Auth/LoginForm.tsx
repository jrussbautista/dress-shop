import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Meta, Button, PageLoader } from '../../shared';
import { useAuth, useToast } from '../../store';

const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(6),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const LoginForm: React.FC = () => {
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
        onSubmit={async ({ email, password }) => {
          try {
            setSubmitting(true);
            await login(email, password);
          } catch (error) {
            setToast('error', error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="page-heading"> Login </h1>
            <div className="group">
              <input
                className={`input ${errors.email && touched.email && 'input-error'}`}
                autoComplete="true"
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
            </div>

            <div className="group">
              <input
                className={`input ${errors.password && touched.password && 'input-error'}`}
                autoComplete="true"
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && touched.password ? (
                <div className="error">{errors.password}</div>
              ) : null}
            </div>
            <div className="group">
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
          }

          @media only screen and (max-width: 600px) {
            .auth-form {
              width: 100%;
              padding: 2rem;
            }
          }

          .auth-form .input {
            width: 100%;
            height: 5rem;
            font-size: 1.7rem;
            border: 1px solid transparent;
            border-bottom: 1px solid #666;
          }

          .auth-form .input:focus {
            outline: none;
          }

          .group {
            margin-top: 2.5rem;
          }

          .error {
            color: red;
            font-size: 1.6rem;
            padding: 0.2rem 0;
          }

          .auth-form .input-error {
            border-bottom: 1px solid red;
          }
        `}
      </style>
    </>
  );
};
