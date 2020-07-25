import { Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import * as Yup from 'yup';
import { PageLoader, Button, Meta } from '../shared';
import { useAuth, useToast } from '../store';
import { AuthService } from '../services';
import { AuthSocial } from '../features/Auth';

const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(6),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const { setCurrentUser } = useAuth();
  const { setToast } = useToast();

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <Meta title="Log In" />
      {submitting && <PageLoader />}
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={async ({ email, password }) => {
            try {
              setSubmitting(true);
              const { user, token } = await AuthService.login(email, password);
              setCurrentUser(user, token);
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
                  className={`input ${
                    errors.email && touched.email && 'input-error'
                  }`}
                  autoComplete="true"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
              </div>

              <div className="group">
                <input
                  className={`input ${
                    errors.password && touched.password && 'input-error'
                  }`}
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
              <div className="link">
                Don't have an account?{' '}
                <Link href="/signup">
                  <a className="link link-text"> Create an account.</a>
                </Link>
              </div>
              <div className="or">
                <span className="line"></span>
                <span className="text">or</span>
                <span className="line"></span>
              </div>
              <AuthSocial />
            </form>
          )}
        </Formik>
      </div>
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

          .link {
            margin-top: 2rem;
            color: var(--color-dark);
            font-size: 1.7rem;
            text-align: center;
          }

          .link-text {
            color: var(--color-primary);
          }

          .error {
            color: red;
            font-size: 1.6rem;
            padding: 0.2rem 0;
          }

          .auth-form .input-error {
            border-bottom: 1px solid red;
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
        `}
      </style>
    </>
  );
};

export default Login;
