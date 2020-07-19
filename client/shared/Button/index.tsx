import React from 'react';
import Link from 'next/link';

interface Props {
  onClick?(): void;
  href?: string;
  type?: 'button' | 'reset' | 'submit';
  title: string;
  variant?: 'primary' | 'outline';
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  onClick,
  href,
  type = 'button',
  title,
  style,
  variant,
  disabled,
}) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a
            role="button"
            className={`btn ${variant ? variant : ''}`}
            style={style}
          >
            {title}
          </a>
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={`btn ${variant ? variant : ''}`}
          style={style}
          disabled={disabled}
        >
          {title}
        </button>
      )}
      <style jsx>{`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 5rem;
          padding: 0 2rem;
          font-size: 1.7rem;
          cursor: pointer;
          background-color: var(--color-dark);
          color: #fff;
          border-radius: var(--border-radius);
          border: 1px solid var(--color-dark);
          width: auto;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .primary {
          background-color: var(--color-primary);
          color: #fff;
          border: 1px solid var(--color-primary);
        }

        .primary:hover {
          background-color: #fff;
          color: var(--color-primary);
        }

        .outline {
          background-color: #fff;
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
        }

        .outline:hover {
          background-color: var(--color-primary);
          color: #fff;
        }
      `}</style>
    </>
  );
};
