import classNames from "classnames";
import type { FC } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";
import { resolveStyle } from "@/utils/resolve-style";

import styles from "./switch.module.scss";

type SwitchProps = {
  size?: "text" | "xs" | "sm" | "md" | "lg" | "xl";
  value: boolean;
  onChange?: (value: boolean) => void;
};

const Switch: FC<SwitchProps> = (props) => {
  const { size = "md", value, onChange } = props;

  const theme = useTheme();
  const jss = useJss();

  const switchStx = jss.hash(
    resolveStyle({
      base: {
        "--switch-rail-bg": theme.colors.gray["300"],
        "--switch-rail-checked-bg": theme.colors.blue["600"],
        "--switch-rail-border-color": theme.colors.gray["400"],
        "--switch-rail-checked-border-color": theme.colors.blue["700"],
        "--switch-thumb-bg": "white",
        "--switch-thumb-border-color": theme.colors.gray["400"],
        "--switch-thumb-checked-border-color": theme.colors.blue["700"],
      },
      variants: {
        size: {
          text: {
            "--switch-rail-height": "0.875rem",
            "--switch-thumb-gap": "-0.5px",
          },
          xs: {
            "--switch-rail-height": `calc(${theme.tokens.inputBaseXsHeight} * 0.75)`,
            "--switch-thumb-gap": "0.5px",
          },
          sm: {
            "--switch-rail-height": `calc(${theme.tokens.inputBaseSmHeight} * 0.8)`,
            "--switch-thumb-gap": "0.5px",
          },
          md: {
            "--switch-rail-height": `calc(${theme.tokens.inputBaseMdHeight} * 0.8)`,
            "--switch-thumb-gap": "1px",
          },
          lg: {
            "--switch-rail-height": `calc(${theme.tokens.inputBaseLgHeight} * 0.8)`,
            "--switch-thumb-gap": "1px",
          },
          xl: {
            "--switch-rail-height": `calc(${theme.tokens.inputBaseXlHeight} * 0.8)`,
            "--switch-thumb-gap": "1px",
          },
        },
      },
      cls: {
        size,
      },
    }),
  );

  return (
    <button
      className={classNames(styles.rail, switchStx)}
      data-checked={value}
      onClick={() => onChange?.(!value)}
      type="button"
      role="switch"
      aria-checked={value}
    >
      <div className={styles.thumb} />
    </button>
  );
};

Switch.displayName = "Switch";

export type { SwitchProps };
export { Switch };
