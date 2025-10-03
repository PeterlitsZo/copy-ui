import classNames from "classnames";
import type { ComponentProps, FC } from "react";
import { useTheme } from "../ThemeProvider";
import styles from "./Typography.module.scss";

// Typography.H1
// =============================================================================

type TypographyH1Props = ComponentProps<"h1"> & {
  mt?: string;
};

const TypographyH1: FC<TypographyH1Props> = (props) => {
  const { children, className, style, ...rest } = props;

  const computedStyle = {
    marginTop: props.mt,
    ...style,
  };

  return (
    <h1
      className={classNames(styles.h1, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </h1>
  );
};

// Typography.H2
// =============================================================================

type TypographyH2Props = ComponentProps<"h2"> & {
  mt?: string;
};

const TypographyH2: FC<TypographyH2Props> = (props) => {
  const { children, className, style, ...rest } = props;

  const theme = useTheme();

  const computedStyle = {
    "--typography-h2-border-color": theme.colors.gray["200"],
    marginTop: props.mt,
    ...style,
  };

  return (
    <h2
      className={classNames(styles.h2, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </h2>
  );
};

// Typography.H3
// =============================================================================

type TypographyH3Props = ComponentProps<"h3"> & {
  mt?: string;
};

const TypographyH3: FC<TypographyH3Props> = (props) => {
  const { children, className, style, ...rest } = props;

  const computedStyle = {
    marginTop: props.mt,
    ...style,
  };

  return (
    <h3
      className={classNames(styles.h3, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </h3>
  );
};

// Typography.P
// =============================================================================

type TypographyPProps = ComponentProps<"p"> & {
  mt?: string;
};

const TypographyP: FC<TypographyPProps> = (props) => {
  const { children, className, style, ...rest } = props;

  const computedStyle = {
    marginTop: props.mt,
    ...style,
  };

  return (
    <p
      className={classNames(styles.p, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </p>
  );
};

// Typography
// =============================================================================

type TypographyType = {
  H1: typeof TypographyH1;
  H2: typeof TypographyH2;
  H3: typeof TypographyH3;
  P: typeof TypographyP;
};

const Typography: TypographyType = {
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  P: TypographyP,
};

export { Typography };
