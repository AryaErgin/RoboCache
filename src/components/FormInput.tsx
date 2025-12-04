import { InputHTMLAttributes } from 'react';
import styles from './FormInput.module.css';

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string };

function FormInput({ label, className = '', ...rest }: Props) {
  return (
    <label className={`${styles.field} ${className}`}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} {...rest} />
    </label>
  );
}

export default FormInput;
