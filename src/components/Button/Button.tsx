import { useContext, type ComponentProps, type CSSProperties } from 'react';
import classNames from 'classnames';
import { merge } from 'es-toolkit';

import { ThemeContext } from '../ThemeProvider/ThemeProvider';

import styles from './Button.module.scss';

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'default' | 'filled';
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
    ...rest
  } = props;

  const computedStyle = mergeStyles([
    variant === 'default' && {
      '--button-bg': 'white',
      '--button-color': theme.colors.gray['800'],
      '--button-border': `1px solid ${theme.colors.gray['200']}`,
      '--button-bg-hover': theme.colors.gray['100'],
    } as CSSProperties,
    variant === 'filled' && {
      '--button-bg': theme.colors.blue['600'],
      '--button-color': 'white',
      '--button-border': 'none',
      '--button-bg-hover': theme.colors.blue['700'],
    } as CSSProperties,
    {
      '--button-height': '2.25rem',
      '--button-padding-x': '1rem',
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
