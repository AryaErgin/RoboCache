import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  className?: string;
}

interface HeadingProps extends TextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  id?: string;
}

interface ParagraphProps extends TextProps {
  muted?: boolean;
}

function Heading({ as = 'h2', className = '', children, id }: HeadingProps) {
  const Tag = as;
  return (
    <Tag id={id} className={`rc-heading ${className}`.trim()}>
      {children}
    </Tag>
  );
}

function Paragraph({ className = '', muted = false, children }: ParagraphProps) {
  return (
    <p className={`rc-paragraph ${muted ? 'rc-paragraph-muted' : ''} ${className}`.trim()}>
      {children}
    </p>
  );
}

function Eyebrow({ className = '', children }: TextProps) {
  return <p className={`rc-eyebrow ${className}`.trim()}>{children}</p>;
}

export { Heading, Paragraph, Eyebrow };
