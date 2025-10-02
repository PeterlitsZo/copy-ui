import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./Typography.module.scss";

// Typography.H1
// =============================================================================

type TypographyH1Props = ComponentProps<"h1">;

const TypographyH1: FC<TypographyH1Props> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <h1 className={classNames(styles.h1, className)} {...rest}>
      {children}
    </h1>
  );
};

// Typography
// =============================================================================

type TypographyType = {
  H1: typeof TypographyH1;
};

const Typography: TypographyType = {
  H1: TypographyH1,
};

export { Typography };
