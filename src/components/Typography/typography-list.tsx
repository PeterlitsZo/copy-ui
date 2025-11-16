import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./typography-list.module.scss";

type TypographyUlProps = ComponentProps<"ul"> & {
  mt?: string;
  mb?: string;
};

const TypographyUl: FC<TypographyUlProps> = (props) => {
  const { children, className, style, mt, mb, ...rest } = props;

  const computedStyle = {
    marginTop: mt,
    marginBottom: mb,
    ...style,
  };

  return (
    <ul
      className={classNames(styles.ul, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </ul>
  );
};

TypographyUl.displayName = "Typography.Ul";

type TypographyOlProps = ComponentProps<"ol"> & {
  mt?: string;
  mb?: string;
};

const TypographyOl: FC<TypographyOlProps> = (props) => {
  const { children, className, style, mt, mb, ...rest } = props;

  const computedStyle = {
    marginTop: mt,
    marginBottom: mb,
    ...style,
  };

  return (
    <ol
      className={classNames(styles.ol, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </ol>
  );
};

TypographyOl.displayName = "Typography.Ol";

type TypographyLiProps = ComponentProps<"li"> & {
  mt?: string;
  mb?: string;
};

const TypographyLi: FC<TypographyLiProps> = (props) => {
  const { children, className, style, mt, mb, ...rest } = props;

  const computedStyle = {
    marginTop: mt,
    marginBottom: mb,
    ...style,
  };

  return (
    <li
      className={classNames(styles.li, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </li>
  );
};

TypographyLi.displayName = "Typography.Li";

export { TypographyUl, TypographyOl, TypographyLi };
