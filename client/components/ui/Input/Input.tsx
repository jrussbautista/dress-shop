import React from 'react';
import styles from './Input.module.css';

interface Props {
  label?: string;
  error?: boolean;
  name: string;
  id: string;
  value: string;
  type: 'text' | 'password' | 'email' | 'number';
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  autoComplete?: string | undefined;
  required?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  name,
  id,
  value,
  onChange,
  type,
  error,
  placeholder,
  autoComplete = 'false',
  required,
}) => {
  const inputClassName = styles.error ? `${styles.input} ${styles.error}` : styles.input;

  return (
    <>
      <div className={styles.group}>
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}
        <input
          className={inputClassName}
          type={type}
          id={id}
          onChange={onChange}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
        />
      </div>
    </>
  );
};

export default Input;
