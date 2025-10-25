import classNames from "classnames";
import dayjs from "dayjs";
import { type FC, type KeyboardEventHandler, useEffect, useState } from "react";
import { useJss } from "@/components/CopyUiProvider";
import { InputBase } from "@/components/InputBase";
import { useTheme } from "@/components/ThemeProvider";
import { CalendarOpener } from "./calendar-opener";
import styles from "./date-picker.module.scss";

const DatePicker: FC = () => {
  const theme = useTheme();
  const jss = useJss();

  const [internalYear, setInternalYear] = useState<number | null>(null);
  const [internalMonth, setInternalMonth] = useState<number | null>(null);
  const [internalDay, setInternalDay] = useState<number | null>(null);
  const [internalHour, setInternalHour] = useState<number | null>(null);
  const [internalMinute, setInternalMinute] = useState<number | null>(null);
  const [internalSecond, setInternalSecond] = useState<number | null>(null);

  const calendarValue = (() => {
    let result = dayjs();
    if (internalYear !== null) {
      result = result.year(internalYear);
    }
    if (internalMonth !== null) {
      result = result.month(internalMonth - 1);
    }
    if (internalDay !== null) {
      result = result.date(internalDay);
    }
    if (internalHour !== null) {
      result = result.hour(internalHour);
    }
    if (internalMinute !== null) {
      result = result.minute(internalMinute);
    }
    if (internalSecond !== null) {
      result = result.second(internalSecond);
    }
    return result;
  })();

  const handleCalendarChange = (day: dayjs.Dayjs) => {
    setInternalYear(day.year());
    setInternalMonth(day.month() + 1);
    setInternalDay(day.date());
  };

  const stx = jss.hash({
    "--data-picker-button-color": theme.colors.gray["700"],
    "--data-picker-button-hover-bg-color": theme.colors.gray["100"],
    "--data-picker-input-padding-inline": "0.5rem",
    "--data-picker-input-part-no-value-color": theme.colors.gray["600"],
    "--data-picker-input-part-hover-bg-color": theme.colors.gray["100"],
    "--data-picker-input-part-focus-bg-color": theme.colors.gray["200"],
    "--data-picker-input-decorator-color": theme.colors.gray["500"],
  });

  return (
    <InputBase
      className={stx}
      wrapperClassName={styles.datePickerInput}
      rightSection={
        <CalendarOpener value={calendarValue} onChange={handleCalendarChange} />
      }
    >
      <DatePickerInputPart
        placeholder="YYYY"
        type="year"
        value={internalYear}
        onChange={setInternalYear}
      />
      <span className={styles.datePickerInputDecorator}>-</span>
      <DatePickerInputPart
        placeholder="MM"
        type="month"
        value={internalMonth}
        onChange={setInternalMonth}
      />
      <span className={styles.datePickerInputDecorator}>-</span>
      <DatePickerInputPart
        placeholder="DD"
        type="day"
        value={internalDay}
        onChange={setInternalDay}
      />
      <span className={styles.datePickerInputDecorator}>&nbsp;</span>
      <DatePickerInputPart
        placeholder="hh"
        type="hour"
        value={internalHour}
        onChange={setInternalHour}
      />
      <span className={styles.datePickerInputDecorator}>:</span>
      <DatePickerInputPart
        placeholder="mm"
        type="minute"
        value={internalMinute}
        onChange={setInternalMinute}
      />
      <span className={styles.datePickerInputDecorator}>:</span>
      <DatePickerInputPart
        placeholder="ss"
        type="second"
        value={internalSecond}
        onChange={setInternalSecond}
      />
    </InputBase>
  );
};

DatePicker.displayName = "DatePicker";

type DatePickerInputPartProps = {
  type: "year" | "month" | "day" | "hour" | "minute" | "second";
  placeholder?: string;
  onChange?: (value: number | null) => void;
  value?: number | null;
};

const DatePickerInputPart: FC<DatePickerInputPartProps> = (props) => {
  const { type, placeholder, onChange, value } = props;

  const [internalValue, setIntervalValue] = useState<number | null>(null);

  // Sync external value to internal value if needed.
  useEffect(() => {
    if (value === undefined) return;
    setIntervalValue(value);
  }, [value]);

  // Notify value change if needed.
  useEffect(() => {
    if (onChange) onChange(internalValue);
  }, [internalValue, onChange]);

  const handleKeyDown: KeyboardEventHandler<HTMLSpanElement> = (e) => {
    const val = e.key;
    const num = parseInt(val, 10);
    if (!Number.isNaN(num)) {
      setIntervalValue((prev) => {
        if (prev === null) return num;
        let newValue = prev * 10 + num;
        switch (type) {
          case "year":
            if (newValue > 9999) newValue = num;
            break;
          case "month":
            if (newValue < 1 || newValue > 12) newValue = num;
            break;
          case "day":
            if (newValue < 1 || newValue > 31) newValue = num;
            break;
          case "hour":
            if (newValue < 0 || newValue > 23) newValue = num;
            break;
          case "minute":
          case "second":
            if (newValue < 0 || newValue > 59) newValue = num;
            break;
        }
        return newValue;
      });
    } else if (val === "Backspace") {
      setIntervalValue((prev) => {
        if (prev === null) return null;
        const newVal = Math.floor(prev / 10);
        return newVal === 0 ? null : newVal;
      });
    }
  };

  const renderValue = () => {
    if (internalValue === null) return null;
    switch (type) {
      case "year":
        return internalValue.toString().padStart(4, "0");
      case "month":
      case "day":
      case "hour":
      case "minute":
      case "second":
        return internalValue.toString().padStart(2, "0");
      default:
        return internalValue.toString();
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: It is Just OK to use static element.
    <span
      /* biome-ignore lint/a11y/noNoninteractiveTabindex: Using span is OK. */
      tabIndex={0}
      inputMode="numeric"
      className={classNames(
        styles.datePickerInputPart,
        internalValue === null && styles.noValue,
      )}
      onKeyDown={handleKeyDown}
    >
      {internalValue !== null ? renderValue() : placeholder}
    </span>
  );
};

export { DatePicker };
