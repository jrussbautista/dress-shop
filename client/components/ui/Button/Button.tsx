import React from 'react';
import Link from 'next/link';
import cName from 'classnames';
import { Spinner } from 'components/ui';
import styles from './Button.module.css';

interface Props {
  onClick?(): void;
  href?: string;
  type?: 'button' | 'reset' | 'submit';
  title?: string;
  variant?: 'default' | 'primary' | 'outline' | 'light';
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
  variant = 'default',
  disabled,
  icon,
  loading,
  className,
}) => {
  const rootClassName = cName(className, styles.btn, styles[variant]);

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
            <Spinner color="#fff" size={30} />
          ) : (
            <>
              {icon && <span className={styles.icon}>{icon}</span>}
              {title}
            </>
          )}
        </button>
      )}
    </>
  );
};

export default Button;
