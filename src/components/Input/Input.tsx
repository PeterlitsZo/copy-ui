import classNames from "classnames";
import { useContext, type ComponentProps, type CSSProperties, type FC } from "react";

import { ThemeContext } from "../ThemeProvider";

import styles from "./Input.module.scss";
import { merge } from "es-toolkit";

export type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
  size?: 'sm' | 'md' | 'lg';
};

export const Input: FC<InputProps> = (props) => {
  const theme = useContext(ThemeContext);

  const { size = 'md', className, style, ...rest } = props;

  const computedStyle = mergeStyles([
    size === 'sm' && {
      '--input-height': '2rem',
      '--input-font-size': '0.875rem',
    } as CSSProperties,
    size === 'md' && {
      '--input-height': '2.25rem',
      '--input-font-size': '1rem',
    } as CSSProperties,
    size === 'lg' && {
      '--input-height': '2.5rem',
      '--input-font-size': '1.125rem',
    } as CSSProperties,
    {
      '--input-min-width': '16rem',
      '--input-padding-inline': '0.5rem',
      '--input-border-color': theme.colors.gray['200'],
      '--input-border-color-focus': theme.colors.blue['800'],
      '--input-border-radius': '0.375rem',
      '--input-line-height': '1.5rem',
      '--input-placeholder-color': theme.colors.gray['600'],
      '--input-caret-color': theme.colors.blue['600'],
    } as CSSProperties,
    style,
  ]);

  return (
    <input
      className={classNames(className, styles.input)}
      style={computedStyle}
      {...rest}
    />
  );
}

Input.displayName = 'Input';

function mergeStyles(styles: (CSSProperties | false | undefined)[]) {
  return styles.reduce((prev, next) => {
    return next ? merge(prev as CSSProperties, next) : prev;
  }, {}) as CSSProperties;
}
