import classNames from "classnames";
import type { FC } from "react";

import { type Theme, useJss, useTheme } from "@/components/CopyUiProvider";
import { resolveStyle2 } from "@/utils/resolve-style2";

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

  const baseStx = jss.hash({
    "--switchRail-bg": theme.colors.gray["300"],
    "--switchRail-bdColor": theme.colors.gray["400"],
    "--switchRail-checked-bg": theme.colors.blue["600"],
    "--switchRail-checked-bdColor": theme.colors.blue["700"],
    "--switchThumb-bg": "white",
    "--switchThumb-bdColor": theme.colors.gray["400"],
    "--switchThumb-checked-bdColor": theme.colors.blue["700"],
  });

  const stx = jss.hash(switchStyle(theme)({ size }));

  return (
    <button
      className={classNames(styles.rail, baseStx, stx)}
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

const switchStyle = (theme: Theme) =>
  resolveStyle2({
    size: {
      text: {
        "--switchRail-h": "0.875rem",
        "--switchThumb-gap": "-0.5px",
      },
      xs: {
        "--switchRail-h": `calc(1.25rem + 1px)`,
        "--switchThumb-gap": "0.5px",
      },
      sm: {
        "--switchRail-h": `calc(1.5rem + 1px)`,
        "--switchThumb-gap": "0.5px",
      },
      md: {
        "--switchRail-h": `calc(1.75rem + 1px)`,
        "--switchThumb-gap": "1px",
      },
      lg: {
        "--switchRail-h": `calc(2rem + 1px)`,
        "--switchThumb-gap": "1px",
      },
      xl: {
        "--switchRail-h": `calc(2.25rem + 1px)`,
        "--switchThumb-gap": "1px",
      },
    },
  });

export type { SwitchProps };
export { Switch };
