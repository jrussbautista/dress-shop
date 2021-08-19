import { Formik } from 'formik';
import Router from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { Meta } from '@/components/core';
import { Button, PageLoader, Input } from '@/components/ui';
import { useAuth, useToast } from '@/contexts';

import styles from './Signup.module.css';

const Schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required').min(6),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const SignUp = () => {
  const { signUp } = useAuth();
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
        onSubmit={async (values) => {
          try {
            setSubmitting(true);
            await signUp(values);
            setSubmitting(false);
            Router.push('/profile');
          } catch (error) {
            setToast('error', error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <Input
              aria-label="Name"
              name="name"
              id="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.name && touched.name)}
            />
            {errors.name && touched.name ? <div className={styles.error}>{errors.name}</div> : null}
            <Input
              aria-label="Email"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              type="email"
              error={Boolean(errors.email && touched.email)}
            />
            {errors.email && touched.email ? (
              <div className={styles.error}>{errors.email}</div>
            ) : null}
            <Input
              aria-label="Password"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              type="password"
              error={Boolean(errors.password && touched.password)}
            />
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}

            <div className={styles.bottom}>
              <Button
                type="submit"
                title="Sign Up"
                disabled={submitting}
                loading={submitting}
                className={styles.button}
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
