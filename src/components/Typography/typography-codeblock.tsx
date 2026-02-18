import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { CodeBlock } from "@/components/CodeBlock";

import styles from "./typography-codeblock.module.css";

// Typography.CodeBlock
// =============================================================================

type TypographyCodeBlockProps = ComponentProps<typeof CodeBlock>;

const TypographyCodeBlock: FC<TypographyCodeBlockProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <CodeBlock
      scrollAreaMaxHeight="calc(50vh + 10rem)"
      className={classNames(styles.codeBlock, className)}
      {...rest}
    />
  );
};

// Export
// =============================================================================

export { TypographyCodeBlock };
