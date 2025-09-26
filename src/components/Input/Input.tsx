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
      '--input-height': theme.tokens.inputBaseSmHeight,
      '--input-font-size': theme.tokens.inputBaseSmFontSize,
      '--input-line-height': theme.tokens.inputBaseSmLineHeight,
    } as CSSProperties,
    size === 'md' && {
      '--input-height': theme.tokens.inputBaseMdHeight,
      '--input-font-size': theme.tokens.inputBaseMdFontSize,
      '--input-line-height': theme.tokens.inputBaseMdLineHeight,
    } as CSSProperties,
    size === 'lg' && {
      '--input-height': theme.tokens.inputBaseLgHeight,
      '--input-font-size': theme.tokens.inputBaseLgFontSize,
      '--input-line-height': theme.tokens.inputBaseLgLineHeight,
    } as CSSProperties,
    {
      '--input-min-width': '16rem',
      '--input-padding-inline': '0.5rem',
      '--input-border-color': theme.tokens.inputBaseDefaultBorderColor,
      '--input-border-color-focus': theme.colors.blue['800'],
      '--input-border-radius': theme.tokens.inputBaseBorderRadius,
      '--input-placeholder-color': theme.tokens.inputBasePlaceholderColor,
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
