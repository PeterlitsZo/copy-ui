import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { CodeBlock } from "@/components/CodeBlock";
import { useTheme } from "@/components/CopyUiProvider";

import styles from "./typography.module.scss";
import { TypographyEm, TypographyStrong } from "./typography-common";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "./typography-headings";
import { TypographyLi, TypographyOl, TypographyUl } from "./typography-list";

// Typography.Root
// =============================================================================

type TypographyRootProps = ComponentProps<"div">;

export const TypographyRoot: FC<TypographyRootProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={classNames(styles.typographyRoot, className)} {...rest}>
      {children}
    </div>
  );
};

// Typography.P
// =============================================================================

type TypographyPProps = ComponentProps<"p"> & {
  mt?: string;
  mb?: string;
};

const TypographyP: FC<TypographyPProps> = (props) => {
  const { children, className, style, mt, mb, ...rest } = props;

  const computedStyle = {
    marginTop: mt,
    marginBottom: mb,
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

// Typography.Code
// =============================================================================

type TypographyCodeProps = ComponentProps<"code">;

const TypographyCode: FC<TypographyCodeProps> = (props) => {
  const { children, className, style, ...rest } = props;

  const theme = useTheme();

  const computedStyle = {
    "--typography-code-bg-color": theme.colors.gray["100"],
    "--typography-code-color": theme.colors.gray["900"],
    ...style,
  };

  return (
    <code
      className={classNames(styles.code, className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </code>
  );
};

// Typography.CodeBlock
// =============================================================================

type TypographyCodeBlockProps = ComponentProps<typeof CodeBlock>;

export const TypographyCodeBlock: FC<TypographyCodeBlockProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <CodeBlock className={classNames(styles.codeBlock, className)} {...rest} />
  );
};

// Typography
// =============================================================================

type ComponentTypography = FC<TypographyRootProps> & {
  Root: typeof TypographyRoot;
  H1: typeof TypographyH1;
  H2: typeof TypographyH2;
  H3: typeof TypographyH3;
  H4: typeof TypographyH4;
  P: typeof TypographyP;
  Ul: typeof TypographyUl;
  Ol: typeof TypographyOl;
  Li: typeof TypographyLi;
  Strong: typeof TypographyStrong;
  Em: typeof TypographyEm;
  Code: typeof TypographyCode;
  CodeBlock: typeof TypographyCodeBlock;
};

const Typography: ComponentTypography = (props: TypographyRootProps) => {
  return <TypographyRoot {...props} />;
};

Typography.Root = TypographyRoot;
Typography.H1 = TypographyH1;
Typography.H2 = TypographyH2;
Typography.H3 = TypographyH3;
Typography.H4 = TypographyH4;
Typography.P = TypographyP;
Typography.Ul = TypographyUl;
Typography.Ol = TypographyOl;
Typography.Li = TypographyLi;
Typography.Strong = TypographyStrong;
Typography.Em = TypographyEm;
Typography.Code = TypographyCode;
Typography.CodeBlock = TypographyCodeBlock;

Typography.displayName = "Typography";

export { Typography };
