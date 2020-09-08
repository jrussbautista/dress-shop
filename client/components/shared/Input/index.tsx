import React from 'react';

interface Props {
  label?: string;
  error?: boolean;
  name: string;
  id: string;
  value: string;
  type: 'text' | 'password' | 'email';
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  autoComplete?: string | undefined;
  required?: boolean;
}

export const Input: React.FC<Props> = ({
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
  const inputClassName = error ? 'input error' : 'input';

  return (
    <>
      <div className="group">
        {label && (
          <label className="label" htmlFor={name}>
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
      <style jsx>{`
        .group {
          margin: 1rem 0;
        }

        .label {
          display: block;
          margin-bottom: 0.5rem;
          color: #9c99b6;
          font-size: 1.7rem;
        }

        .input {
          width: 100%;
          height: 5rem;
          font-size: 1.6rem;
          border: 1px solid transparent;
          border-bottom: 1px solid #666;
        }

        .error {
          border-bottom: 1px solid var(--color-red);
        }
      `}</style>
    </>
  );
};
