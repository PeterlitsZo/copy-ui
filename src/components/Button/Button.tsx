import classNames from 'classnames';
import styles from './Button.module.scss';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
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
    ...rest
  } = props;

  const computedStyle = {
    '--button-height': '2.25rem',
    '--button-padding-x': '1rem',
    '--button-bg': theme.colors.blue['600'],
    '--button-color': 'white',
    '--button-border': 'none',
    '--button-radius': '0.375rem',
    '--button-bg-hover': theme.colors.blue['700'],

    ...style,
  };

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
