import classNames from "classnames";
import type { ComponentProps, CSSProperties, FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./paper.module.scss";

type PaperProps = ComponentProps<"div"> & {
  radius?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  withBorder?: boolean;
  withPadding?: boolean;
};

const Paper: FC<PaperProps> = (props) => {
  const {
    className,
    radius = "none",
    shadow = "none",
    withBorder = false,
    withPadding = false,
    ...rest
  } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--paper-bg": "white",
    "--paper-border-color": theme.colors.gray["300"],
    "--paper-border-radius": {
      none: "0px",
      sm: "0.25rem",
      md: "0.5rem",
      lg: "1rem",
    }[radius],
    "--paper-box-shadow": shadow === "none" ? undefined : theme.shadow[shadow],
  }) as CSSProperties;

  return (
    <div
      className={classNames(styles.paper, stx, className)}
      data-with-border={withBorder}
      data-with-padding={withPadding}
      {...rest}
    />
  );
};

Paper.displayName = "Paper";

export { Paper };
