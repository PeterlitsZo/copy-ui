import classNames from 'classnames';
import styles from './Button.module.scss';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const theme = useContext(ThemeContext);

  const { className, style, ...rest } = props;

  const computedStyle = {
    '--button-height': '2.25rem',
    '--button-padding-x': '1rem',
    '--button-bg': theme.colors.blue['600'],
    '--button-color': 'white',
    '--button-border': 'none',
    '--button-radius': '0.375rem',

    ...style,
  };

  return (
    <button
      className={classNames(styles.button, className)}
      style={computedStyle}
      {...rest}
    />
  )
}
