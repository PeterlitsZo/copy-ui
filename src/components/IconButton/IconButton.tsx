import { useContext, type ComponentProps, type CSSProperties, type FC} from "react";
import classNames from "classnames";
import { merge } from 'es-toolkit';

import { ThemeContext } from "../ThemeProvider";

import styles from "./IconButton.module.scss";

export type IconButtonProps = ComponentProps<'button'> & {
  variant?: 'default' | 'filled';
};

export const IconButton: FC<IconButtonProps> = (props) => {
  const theme = useContext(ThemeContext);

  const { className, style, variant = 'default', ...rest } = props;

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
    {
      '--button-size': '2.25rem',
      '--button-radius': '0.375rem',
    } as CSSProperties,
    style,
  ]);

  return (
    <button className={classNames(styles.iconButton, className)} style={computedStyle} {...rest}>
      {props.children}
    </button>
  );
}

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
