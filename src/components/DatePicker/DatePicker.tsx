import { CalendarDays } from "lucide-react";
import type { FC } from "react";

import { InputBase } from "@/components/InputBase";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./DatePicker.module.scss";

export const DatePicker: FC = () => {
  const theme = useTheme();

  const computedStyle = {
    "--data-picker-button-color": theme.colors.gray["700"],
    "--data-picker-button-hover-bg-color": theme.colors.gray["100"],
    "--data-picker-input-padding-inline": "0.5rem",
    "--data-picker-input-part-hover-bg-color": theme.colors.gray["100"],
    "--data-picker-input-part-color": theme.colors.gray["600"],
    "--data-picker-input-decorator-color": theme.colors.gray["500"],
  } as React.CSSProperties;

  const rightSection = (
    <button type="button" className={styles.dataPickerButton}>
      <CalendarDays size={"65%"} />
    </button>
  );

  return (
    <InputBase
      wrapperClassName={styles.dataPickerInput}
      rightSection={rightSection}
      style={computedStyle}
    >
      <span className={styles.part}>YYYY</span>
      <span className={styles.decorator}>-</span>
      <span className={styles.part}>MM</span>
      <span className={styles.decorator}>-</span>
      <span className={styles.part}>DD</span>
      <span className={styles.decorator}>&nbsp;</span>
      <span className={styles.part}>hh</span>
      <span className={styles.decorator}>:</span>
      <span className={styles.part}>mm</span>
      <span className={styles.decorator}>:</span>
      <span className={styles.part}>ss</span>
    </InputBase>
  );
};

DatePicker.displayName = "DatePicker";
