import React from 'react';
import Link from 'next/link';

interface Props {
  onClick?(): void;
  href?: string;
  type?: 'button' | 'reset' | 'submit';
  title?: string;
  variant?: 'primary' | 'outline' | 'light';
  style?: React.CSSProperties;
  disabled?: boolean;
  icon?: React.ReactElement;
  text?: boolean;
}

export const Button: React.FC<Props> = ({
  onClick,
  href,
  type = 'button',
  title,
  style,
  variant,
  disabled,
  icon,
  text,
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
          className={`btn ${variant ? variant : ''} ${text ? 'text' : ''}`}
          style={style}
          disabled={disabled}
        >
          {icon && <span className="icon">{icon}</span>}
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

        .text {
          background-color: transparent;
          color: var(--color-primary);
          border: 1px solid transparent;
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

        .light {
          background-color: #fff;
          color: #3d3d3d;
          border: 1px solid rgb(205, 209, 212);
        }

        .icon {
          width: 20px;
          height: 20px;
          margin-right: 1rem;
        }
      `}</style>
    </>
  );
};
