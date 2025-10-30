import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";
import { resolveStyle } from "@/utils/resolve-style";

import styles from "./IconButton.module.scss";

export type IconButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "filled";
  size?: "sm" | "md" | "lg";
};

export const IconButton: FC<IconButtonProps> = (props) => {
  const theme = useTheme();

  const { variant = "default", size = "md", className, ...rest } = props;

  const jss = useJss();

  const stx = jss.hash(
    resolveStyle({
      base: {
        "--button-radius": "0.375rem",
      },
      variants: {
        variant: {
          default: {
            "--button-bg": "white",
            "--button-color": theme.colors.gray["800"],
            "--button-border-width": "1px",
            "--button-border-style": "solid",
            "--button-border-color": theme.tokens.inputBaseDefaultBorderColor,
            "--button-bg-hover": theme.colors.gray["100"],
          },
          filled: {
            "--button-bg": theme.colors.blue["600"],
            "--button-color": "white",
            "--button-border-width": "1px",
            "--button-border-style": "solid",
            "--button-border-color": theme.colors.blue["700"],
            "--button-bg-hover": theme.colors.blue["700"],
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
      },
      cls: {
        variant,
        size,
      },
    }),
  );

  return (
    <button className={classNames(styles.iconButton, stx, className)} {...rest}>
      {props.children}
    </button>
  );
};
