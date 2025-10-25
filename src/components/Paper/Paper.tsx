import classNames from "classnames";
import type { ComponentProps, CSSProperties, FC } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./paper.module.scss";

type PaperProps = ComponentProps<"div"> & {
  radius?: "none" | "sm" | "md" | "lg";
  withBorder?: boolean;
  withPadding?: boolean;
};

const Paper: FC<PaperProps> = (props) => {
  const {
    className,
    radius = "none",
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
  }) as CSSProperties;

  return (
    <div
      className={classNames(className, styles.paper, stx)}
      data-with-border={withBorder}
      data-with-padding={withPadding}
      {...rest}
    />
  );
};

Paper.displayName = "Paper";

export { Paper };
