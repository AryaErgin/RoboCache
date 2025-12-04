import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' };

function Button({ children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
