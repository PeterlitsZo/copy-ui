import classNames from "classnames";
import dayjs from "dayjs";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { FC, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./calendar.module.scss";

interface CalendarProps {
  value?: dayjs.Dayjs | null;
  onChange?: (date: dayjs.Dayjs) => void;
}

export const Calendar: FC<CalendarProps> = (props) => {
  const { value = dayjs(), onChange } = props;

  const theme = useTheme();
  const jss = useJss();

  const [viewMonth, setViewMonth] = useState(dayjs().month());
  const [viewYear, setViewYear] = useState(dayjs().year());
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const [pickerHeight, setPickerHeight] = useState<number | null>(null);
  const [pickerWidth, setPickerWidth] = useState<number | null>(null);
  const [pickerReadyToScroll, setPickerReadyToScroll] = useState(false);

  const tableRef = useRef<HTMLTableElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const monthColumnRef = useRef<HTMLDivElement>(null);
  const yearColumnRef = useRef<HTMLDivElement>(null);

  const stx = jss.hash({
    "--calendar-bgColor": theme.colors.gray["000"],
    "--calendar-bdColor": theme.tokens.inputBaseDefaultBorderColor,
    "--calendar-bdRadius": theme.tokens.inputBaseBorderRadius,
    "--calendar-p": "0.75rem",
    "--calendarMain-bgColor": "white",
    "--calendarMainCell-selected-bgColor": theme.colors.blue["600"],
    "--calendarMainCell-selected-textColor": "white",
    "--calendarMainCell-hover-bgColor": theme.colors.gray["100"],
    "--calendarHeaderButton-hover-bgColor": theme.colors.gray["200"],
    "--calendarHeaderTitleButton-hover-bgColor": theme.colors.gray["200"],
    "--calendarPicker-bgColor": theme.colors.gray["000"],
    "--calendarPicker-hover-bgColor": theme.colors.gray["100"],
    "--calendarPicker-selected-bgColor": theme.colors.blue["600"],
    "--calendarPicker-selected-textColor": "white",
    "--calendarPickerBar-bgColor": theme.colors.gray["200"],
  });

  // Calendar header's content.
  const view = dayjs(value).year(viewYear).month(viewMonth);
  const header = view.format("MMM YYYY");

  // Calendar thead's cells.
  const theadCells: ReactNode[] = [];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  for (let i = 0; i < days.length; i++) {
    theadCells.push(<th key={i}>{days[i]}</th>);
  }

  // Calendar tbody's rows and cells.
  const monthStart = view.startOf("month");
  const monthEnd = view.endOf("month");
  const weeksInMonth = Math.ceil((monthEnd.date() + monthStart.day()) / 7);
  const tbodyRows: ReactNode[] = [];
  for (let week = 0; week < weeksInMonth; week++) {
    const cells: ReactNode[] = [];
    for (let day = 0; day < 7; day++) {
      const date = week * 7 + day - monthStart.day() + 1;
      const isSelected = view.date(date).isSame(value);
      if (date > 0 && date <= monthEnd.date()) {
        const handleSelectDate = () => onChange?.(monthStart.date(date));
        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            handleSelectDate();
          }
        };
        cells.push(
          <td key={day} data-selected={isSelected}>
            <button
              type="button"
              onClick={handleSelectDate}
              onKeyDown={handleKeyDown}
            >
              {date}
            </button>
          </td>,
        );
      } else {
        cells.push(<td key={day}></td>);
      }
    }
    tbodyRows.push(<tr key={week}>{cells}</tr>);
  }

  // Handlers for previous and next year or month buttons.
  const handlePrevYear = () => {
    setViewYear((prev) => prev - 1);
  };
  const handleNextYear = () => {
    setViewYear((prev) => prev + 1);
  };
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };
  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Wheel helpers: only update state; scrolling is derived from state
  // in the effects that center the selected month/year item.
  const changeMonthByStep = useCallback((direction: 1 | -1) => {
    setViewMonth((prevMonth) => {
      let nextMonth = prevMonth + direction;
      if (nextMonth < 0) {
        nextMonth = 0;
      } else if (nextMonth > 11) {
        nextMonth = 11;
      }
      return nextMonth;
    });
  }, []);

  const changeYearByStep = useCallback((direction: 1 | -1) => {
    setViewYear((prevYear) => prevYear + direction);
  }, []);

  const handleToggleMonthYearPicker = () => {
    if (!showMonthYearPicker) {
      // Opening picker: get table dimensions first, then show picker.
      if (tableRef.current) {
        const tableHeight = tableRef.current.offsetHeight;
        const tableWidth = tableRef.current.offsetWidth;
        setPickerHeight(tableHeight);
        setPickerWidth(tableWidth);
        setShowMonthYearPicker(true);
      }
    } else {
      // Closing picker: just hide it.
      setShowMonthYearPicker(false);
      setPickerReadyToScroll(false);
    }
  };

  const centerPickerColumns = useCallback((smooth: boolean = true) => {
    // Scroll month column to center based on selected month
    if (monthColumnRef.current) {
      const selectedMonthItem = monthColumnRef.current.querySelector(
        `[data-selected-month="true"]`,
      ) as HTMLElement;
      if (selectedMonthItem) {
        const container = monthColumnRef.current;
        const scrollTop =
          selectedMonthItem.offsetTop -
          container.clientHeight / 2 +
          selectedMonthItem.clientHeight / 2;
        container.scrollTo({
          top: scrollTop,
          behavior: smooth ? "smooth" : "instant",
        });
      }
    }

    // Scroll year column to center based on selected year
    if (yearColumnRef.current) {
      const selectedYearItem = yearColumnRef.current.querySelector(
        `[data-selected-year="true"]`,
      ) as HTMLElement;
      if (selectedYearItem) {
        const container = yearColumnRef.current;
        const scrollTop =
          selectedYearItem.offsetTop -
          container.clientHeight / 2 +
          selectedYearItem.clientHeight / 2;
        container.scrollTo({ top: scrollTop, behavior: "smooth" });
      }
    }
  }, []);

  // Calculate spacer height and scroll to center when picker is shown.
  useEffect(() => {
    if (!showMonthYearPicker) return;

    // Use setTimeout to ensure DOM is updated and styles are applied.
    const timeoutId = setTimeout(() => {
      // Calculate spacer height based on container height
      if (monthColumnRef.current) {
        const containerHeight = monthColumnRef.current.clientHeight;
        const spacerHeightValue = containerHeight / 2 - 16 - 20;
        setSpacerHeight(spacerHeightValue);

        requestAnimationFrame(() => {
          centerPickerColumns();
          setPickerReadyToScroll(true);
        });
      }
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showMonthYearPicker, centerPickerColumns]);

  // Attach non-passive wheel listeners so we can fully control scroll behavior
  // on the month/year columns. Wheel only updates state; scrolling is derived
  // from state in the centering effect below.
  const monthWheelCntRef = useRef(0);
  const yearWheelCntRef = useRef(0);
  const stepRef = useRef(10);
  const minDeltaYRef = useRef(11);
  const maxDeltaYRef = useRef(1000);
  const lastScrollTimeRef = useRef<number>(0);
  useEffect(() => {
    if (!showMonthYearPicker) return;

    const monthEl = monthColumnRef.current;
    const yearEl = yearColumnRef.current;
    if (!monthEl && !yearEl) return;

    const handleHelper = (
      event: WheelEvent,
      cntRef: React.RefObject<number>,
      changeFn: (direction: 1 | -1) => void,
    ) => {
      event.preventDefault();

      const BURNOUT_TIME = 256;

      const currentTime = Date.now();

      // Calculate the direction and deltaY.
      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;
      if (Math.abs(event.deltaY) <= 0) {
        return;
      }
      let deltaY = Math.min(
        Math.max(Math.abs(event.deltaY) ** 1.3, minDeltaYRef.current),
        maxDeltaYRef.current,
      );
      const lastScrollTimeDiff = currentTime - lastScrollTimeRef.current;
      if (lastScrollTimeDiff < BURNOUT_TIME) {
        // Already scrolled for a short time, too tried. Slow down please.
        deltaY = deltaY * 0.03;
      } else if (lastScrollTimeDiff < BURNOUT_TIME * 4) {
        // Already scrolled for a long time, still tried.
        const alpha =
          ((lastScrollTimeDiff - BURNOUT_TIME) / (BURNOUT_TIME * 3)) * 0.97 +
          0.03;
        deltaY = deltaY * alpha;
      }

      // Update the counter.
      cntRef.current += direction * deltaY;
      while (Math.abs(cntRef.current) >= stepRef.current) {
        if (cntRef.current > 0) {
          cntRef.current -= stepRef.current;
        } else {
          cntRef.current += stepRef.current;
        }

        changeFn(direction);
        requestAnimationFrame(() => centerPickerColumns(true));
        lastScrollTimeRef.current = currentTime;
        cntRef.current *= 0.5;
      }
    };

    const handleWheelMonth = (event: WheelEvent) => {
      handleHelper(event, monthWheelCntRef, changeMonthByStep);
    };

    const handleWheelYear = (event: WheelEvent) => {
      handleHelper(event, yearWheelCntRef, changeYearByStep);
    };

    monthEl?.addEventListener("wheel", handleWheelMonth, { passive: false });
    yearEl?.addEventListener("wheel", handleWheelYear, { passive: false });

    return () => {
      monthEl?.removeEventListener("wheel", handleWheelMonth);
      yearEl?.removeEventListener("wheel", handleWheelYear);
    };
  }, [
    showMonthYearPicker,
    changeMonthByStep,
    changeYearByStep,
    centerPickerColumns,
  ]);

  return (
    <div className={classNames(styles.calendar, stx)}>
      <div className={styles.calendarHeader}>
        <button
          type="button"
          onClick={handlePrevYear}
          aria-label="Previous year"
        >
          <ChevronsLeft size="1.25rem" />
        </button>
        <button
          type="button"
          onClick={handlePrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size="1.25rem" />
        </button>
        <div className={styles.calendarHeaderTitle}>
          <button
            type="button"
            className={styles.calendarHeaderTitleButton}
            onClick={handleToggleMonthYearPicker}
          >
            {header}
          </button>
        </div>
        <button type="button" onClick={handleNextMonth} aria-label="Next month">
          <ChevronRight size="1.25rem" />
        </button>
        <button type="button" onClick={handleNextYear} aria-label="Next year">
          <ChevronsRight size="1.25rem" />
        </button>
      </div>
      <div>
        {!showMonthYearPicker && (
          <table ref={tableRef} className={styles.calendarContent}>
            <thead>
              <tr>{theadCells}</tr>
            </thead>
            <tbody>{tbodyRows}</tbody>
          </table>
        )}
        {showMonthYearPicker && (
          <div
            ref={pickerRef}
            className={styles.calendarMonthYearPicker}
            style={{
              ...(pickerHeight !== null ? { height: `${pickerHeight}px` } : {}),
              ...(pickerWidth !== null ? { width: `${pickerWidth}px` } : {}),
              ...(pickerReadyToScroll ? { opacity: 1 } : { opacity: 0 }),
            }}
          >
            <div className={styles.calendarMonthYearPickerBar} />
            <div
              ref={monthColumnRef}
              className={styles.calendarMonthYearPickerColumn}
            >
              <div
                className={styles.calendarMonthYearPickerSpacer}
                style={{ height: spacerHeight }}
              />
              {Array.from({ length: 12 }, (_, i) => {
                const monthName = dayjs().month(i).format("MMM");
                const isSelected = i === viewMonth;
                return (
                  <button
                    key={monthName}
                    data-month-index={i}
                    data-selected-month={isSelected ? "true" : undefined}
                    className={styles.calendarMonthYearPickerItem}
                    type="button"
                    onClick={() => {
                      setViewMonth(i);
                      // Re-center after state update.
                      requestAnimationFrame(() => centerPickerColumns(true));
                    }}
                  >
                    {monthName}
                  </button>
                );
              })}
              <div
                className={styles.calendarMonthYearPickerSpacer}
                style={{ height: spacerHeight }}
              />
            </div>
            <div
              ref={yearColumnRef}
              className={styles.calendarMonthYearPickerColumn}
            >
              <div
                className={styles.calendarMonthYearPickerSpacer}
                style={{ height: spacerHeight }}
              />
              {Array.from({ length: 21 }, (_, i) => {
                const year = viewYear - 10 + i;
                const isSelected = year === viewYear;
                return (
                  <button
                    key={year}
                    data-year-value={year}
                    data-selected-year={isSelected ? "true" : undefined}
                    className={styles.calendarMonthYearPickerItem}
                    type="button"
                    onClick={() => {
                      setViewYear(year);
                      // Re-center after state update.
                      requestAnimationFrame(() => centerPickerColumns(true));
                    }}
                  >
                    {year}
                  </button>
                );
              })}
              <div
                className={styles.calendarMonthYearPickerSpacer}
                style={{ height: spacerHeight }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
