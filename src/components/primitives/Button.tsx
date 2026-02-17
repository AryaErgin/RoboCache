import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
}

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

type RouterButtonProps = BaseButtonProps &
  Omit<LinkProps, 'to'> & {
    as: 'link';
    to: string;
  };

type ButtonProps = NativeButtonProps | AnchorButtonProps | RouterButtonProps;

function classNames(variant: Variant, className: string) {
  return `rc-button rc-button-${variant} ${className}`.trim();
}

function Button(props: ButtonProps) {
  const { children, className = '', variant = 'primary' } = props;
  const classes = classNames(variant, className);

  if (props.as === 'a') {
    const { as: _as, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  if (props.as === 'link') {
    const { as: _as, to, ...rest } = props;
    return (
      <Link className={classes} to={to} {...rest}>
        {children}
      </Link>
    );
  }

  const { as: _as, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
