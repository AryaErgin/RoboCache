import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from './Container';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}

function Section({ id, className = '', children, labelledBy }: SectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`rc-section ${className}`.trim()}
      aria-labelledby={labelledBy}
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ amount: 0.18, once: true }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container>{children}</Container>
    </motion.section>
  );
}

export default Section;
