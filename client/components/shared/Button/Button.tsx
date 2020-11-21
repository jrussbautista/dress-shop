import React from 'react';
import Link from 'next/link';
import cName from 'classnames';
import { Spinner } from 'components/shared';
import styles from './Button.module.css';

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
  loading?: boolean;
  className?: string;
}

const Button: React.FC<Props> = ({
  onClick,
  href,
  type = 'button',
  title,
  style,
  variant,
  disabled,
  icon,
  loading,
  className,
}) => {
  const rootClassName = cName(styles.btn, styles[variant], className);

  return (
    <>
      {href ? (
        <Link href={href}>
          <a role="button" className={rootClassName} style={style}>
            {title}
          </a>
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={rootClassName}
          style={style}
          disabled={disabled}
        >
          {loading ? (
            <Spinner color="#fff" width={40} height={40} />
          ) : (
            <>
              {icon && <span className="icon">{icon}</span>}
              {title}
            </>
          )}
        </button>
      )}
    </>
  );
};

export default Button;
