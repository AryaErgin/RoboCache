import styles from './Badge.module.css';

type BadgeProps = { label: string; tone?: 'info' | 'success' | 'warning' };

function Badge({ label, tone = 'info' }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{label}</span>;
}

export default Badge;
