import { Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Layout from '../components/Layout';
import { Alert } from '../components/Shared';
import PageLoader from '../components/Shared/Loader/PageLoader';
import { useAuth } from '../store';

const SignUp = () => {
  const [submit, setSubmit] = useState(false);
  const { error, signUp, clearError } = useAuth();

  useEffect(() => {
    return () => error && clearError();
  }, [error]);

  const Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required')
  });

  return (
    <>
      <Layout>
        {submit && <PageLoader />}
        <div className="container">
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: ''
            }}
            validationSchema={Schema}
            onSubmit={async values => {
              setSubmit(true);
              const res = await signUp(values);
              if (res === 'error') setSubmit(false);
            }}
          >
            {({ errors, touched, handleChange, handleSubmit, values }) => (
              <form onSubmit={handleSubmit} className="auth-form">
                <h1 className="page-heading"> Sign Up </h1>
                {error && <Alert message={error} type="error" />}
                <div className="group">
                  <input
                    className={`input ${errors.name &&
                      touched.name &&
                      'input-error'}`}
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name ? (
                    <div className="error">{errors.name}</div>
                  ) : null}
                </div>
                <div className="group">
                  <input
                    className={`input ${errors.email &&
                      touched.email &&
                      'input-error'}`}
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
                    className={`input ${errors.password &&
                      touched.password &&
                      'input-error'}`}
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
                  <button type="submit" className="btn" disabled={submit}>
                    Sign Up
                  </button>
                </div>
                <span className="link">
                  Already have an account?{' '}
                  <Link href="/login">
                    <a className="link link-text"> Login your Account.</a>
                  </Link>
                </span>
              </form>
            )}
          </Formik>
        </div>
      </Layout>
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

          .auth-form .btn {
            width: 100%;
            height 6rem;
            background-color: var(--color-dark);
            color: #fff;
            font-size: 2rem;
            font-family: inherit;
            border: 1px solid var(--color-dark);
            cursor: pointer;
          }

          .link {
            margin-top: 1rem;
            color: var(--color-dark);
            display: inline-block;
            font-size: 1.7rem;
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
        `}
      </style>
    </>
  );
};

export default SignUp;
