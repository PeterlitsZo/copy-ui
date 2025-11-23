import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { type Theme, useJss, useTheme } from "@/components/CopyUiProvider";
import { resolveStyle2 } from "@/utils/resolve-style2";

import styles from "./icon-button.module.scss";

type IconButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "filled";
  size?: "sm" | "md" | "lg";
};

const IconButton: FC<IconButtonProps> = (props) => {
  const theme = useTheme();

  const { variant = "default", size = "md", className, ...rest } = props;

  const jss = useJss();

  const baseStx = jss.hash({
    "--button-bdRadius": "0.375rem",
  });

  const stx = jss.hash(
    style(theme)({
      variant,
      size,
    }),
  );

  return (
    <button
      className={classNames(styles.iconButton, baseStx, stx, className)}
      {...rest}
    >
      {props.children}
    </button>
  );
};

IconButton.displayName = "IconButton";

const style = (theme: Theme) =>
  resolveStyle2({
    variant: {
      default: {
        "--button-bgColor": "white",
        "--button-color": theme.colors.gray["800"],
        "--button-bdWidth": "1px",
        "--button-bdStyle": "solid",
        "--button-bdColor": theme.tokens.inputBaseDefaultBorderColor,
        "--button-hover-bgColor": theme.colors.gray["100"],
      },
      filled: {
        "--button-bgColor": theme.colors.blue["600"],
        "--button-color": "white",
        "--button-bdWidth": "1px",
        "--button-bdStyle": "solid",
        "--button-bdColor": theme.colors.blue["700"],
        "--button-hover-bgColor": theme.colors.blue["700"],
      },
    },
    size: {
      sm: {
        "--button-size": "2rem",
        "--icon-size": "1rem",
      },
      md: {
        "--button-size": "2.25rem",
        "--icon-size": "1.125rem",
      },
      lg: {
        "--button-size": "2.5rem",
        "--icon-size": "1.25rem",
      },
    },
  });

export type { IconButtonProps };
export { IconButton };
