import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Meta, Button, PageLoader, Input } from 'components/shared';
import { useAuth, useToast } from 'contexts';
import { AuthService } from 'services';
import styles from './SignupForm.module.css';

const Schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required').min(6),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const SignUpForm: React.FC = () => {
  const { login } = useAuth();
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
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <h1 className={styles.pageHeading}> Sign Up </h1>
            <Input
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
                className={styles.button}
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
