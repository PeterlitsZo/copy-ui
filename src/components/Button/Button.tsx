import { useContext, type ComponentProps, type CSSProperties } from 'react';
import classNames from 'classnames';
import { merge } from 'es-toolkit';

import { ThemeContext } from '../ThemeProvider/ThemeProvider';

import styles from './Button.module.scss';

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'default' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

export function Button(props: ButtonProps) {
  const theme = useContext(ThemeContext);

  const {
    className,
    style,
    children,
    leftSection,
    rightSection,
    variant = 'default',
    size = 'md',
    ...rest
  } = props;

  const computedStyle = mergeStyles([
    variant === 'default' && {
      '--button-bg': 'white',
      '--button-color': theme.colors.gray['800'],
      '--button-border-width': '1px',
      '--button-border-style': 'solid',
      '--button-border-color': theme.colors.gray['200'],
      '--button-bg-hover': theme.colors.gray['100'],
    } as CSSProperties,
    variant === 'filled' && {
      '--button-bg': theme.colors.blue['600'],
      '--button-color': 'white',
      '--button-border-width': '1px',
      '--button-border-style': 'solid',
      '--button-border-color': theme.colors.blue['700'],
      '--button-bg-hover': theme.colors.blue['700'],
    } as CSSProperties,
    size === 'sm' && {
      '--button-height': '2rem',
      '--button-padding-x': '0.75rem',
      '--button-section-gap': '0.5rem',
      '--button-font-size': '0.875rem',
    } as CSSProperties,
    size === 'md' && {
      '--button-height': '2.25rem',
      '--button-padding-x': '1rem',
      '--button-section-gap': '0.625rem',
      '--button-font-size': '1rem',
    } as CSSProperties,
    size === 'lg' && {
      '--button-height': '2.5rem',
      '--button-padding-x': '1.25rem',
      '--button-section-gap': '0.75rem',
      '--button-font-size': '1.125rem',
    } as CSSProperties,
    {
      '--button-radius': '0.375rem',
    } as CSSProperties,
    style,
  ]);

  return (
    <button
      className={classNames(styles.button, className)}
      style={computedStyle}
      {...rest}
    >
      {leftSection && <span className={styles.buttonLeftSection}>{leftSection}</span>}
      <span>{children}</span>
      {rightSection && <span className={styles.buttonRightSection}>{rightSection}</span>}
    </button>
  )
}

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
