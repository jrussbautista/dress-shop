import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Meta, Button, PageLoader, Input } from 'components/shared';
import { useAuth, useToast } from 'store';
import { AuthService } from 'services';

const Schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required').min(6),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const SignUpForm: React.FC = () => {
  const { setCurrentUser } = useAuth();
  const { setToast } = useToast();

  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    email: '',
    password: '',
    name: '',
  };

  return (
    <>
      <Meta title="Sign Up" />
      {submitting && <PageLoader />}
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={(values) => {
          AuthService.signUp(values)
            .then(({ user, token }) => {
              login(user, token);
            })
            .catch((error) => {
              setToast('error', error.message);
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="page-heading"> Sign Up </h1>
            <Input
              name="name"
              id="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.name && touched.name)}
            />
            {errors.name && touched.name ? <div className="error">{errors.name}</div> : null}
            <Input
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
                title="Sign Up"
                disabled={submitting}
                style={{
                  width: '100%',
                  height: '6rem',
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
          .container {
            max-width: 1200px;
            margin: 2rem auto;
          }

          .page-heading {
            font-size: 3rem;
            text-transform: uppercase;
          }

          .auth-form {
            padding: 2rem 0;
            width: 50rem;
            margin: 0 auto;
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
