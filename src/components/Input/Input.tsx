import classNames from "classnames";
import { useContext, type ComponentProps, type FC } from "react";

import { ThemeContext } from "../ThemeProvider";

import styles from "./Input.module.scss";

export type InputProps = ComponentProps<'input'>;

export const Input: FC<InputProps> = (props) => {
  const theme = useContext(ThemeContext);

  const { className, style, ...rest } = props;

  const computedStyle = {
    '--input-border-color': theme.colors.gray['200'],
    '--input-border-color-focus': theme.colors.blue['800'],
    '--input-border-radius': '0.375rem',
    '--input-font-size': '1rem',
    '--input-line-height': '1.5rem',
    '--input-placeholder-color': theme.colors.gray['600'],
    '--input-caret-color': theme.colors.blue['600'],
    ...style,
  } as React.CSSProperties;

  return (
    <input
      className={classNames(className, styles.input)}
      style={computedStyle}
      {...rest}
    />
  );
}