import classNames from "classnames";
import { Moon, Sun } from "lucide-react";
import type { FC } from "react";

import { useMode, useSetMode, useTheme } from "@/components/CopyUiProvider";
import { IconButton } from "@/components/IconButton";

import styles from "./topbar.module.scss";

type TopbarProps = {
  className?: string;
};

const Topbar: FC<TopbarProps> = (props) => {
  const { className } = props;
  const theme = useTheme();
  const mode = useMode();
  const setMode = useSetMode();

  const handleToggleDarkMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={classNames(styles.topbar, className)}
      style={
        {
          "--topbar-bg": "white",
          "--topbar-border-color": theme.colors.gray["300"],
        } as React.CSSProperties
      }
    >
      <div className={styles.content}>
        <span className={styles.logo}>Copy UI</span>
        <div className={styles.spacer} />
        <IconButton
          variant="default"
          size="sm"
          onClick={handleToggleDarkMode}
          aria-label={
            mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {mode === "dark" ? <Sun size="1.125rem" /> : <Moon size="1.125rem" />}
        </IconButton>
      </div>
    </div>
  );
};

Topbar.displayName = "Topbar";

export { Topbar };
