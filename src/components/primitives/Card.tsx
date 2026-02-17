import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div';
}

function Card({ children, className = '', as = 'div' }: CardProps) {
  const Tag = as;
  return <Tag className={`rc-card ${className}`.trim()}>{children}</Tag>;
}

export default Card;
