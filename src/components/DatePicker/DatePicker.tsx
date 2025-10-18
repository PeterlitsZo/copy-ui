import { CalendarDays } from "lucide-react";
import type { FC } from "react";

import { Calendar } from "@/components/Calendar";
import { InputBase } from "@/components/InputBase";
import { Popover } from "@/components/Popover";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./DatePicker.module.scss";

// CalendarOpener
// =============================================================================

const CalendarOpener: FC = () => {
  return (
    <Popover>
      <Popover.Trigger
        render={({ setRef, onToggle }) => (
          <button
            type="button"
            className={styles.calendarOpener}
            ref={setRef}
            onClick={onToggle}
          >
            <CalendarDays size={"60%"} />
          </button>
        )}
      />
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, isOpen, floatingStyles }) =>
          isOpen && (
            <div ref={(el) => setRef(el)} style={floatingStyles}>
              <Calendar />
            </div>
          )
        }
      />
    </Popover>
  );
};

// DatePicker
// =============================================================================

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

  return (
    <InputBase
      wrapperClassName={styles.dataPickerInput}
      rightSection={<CalendarOpener />}
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
