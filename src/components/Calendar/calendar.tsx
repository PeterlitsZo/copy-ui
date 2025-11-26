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

  const handleSelectMonth = useCallback((month: number) => {
    setViewMonth(month);
  }, []);

  const handleSelectYear = useCallback((year: number) => {
    setViewYear(year);
  }, []);

  // Calculate spacer height and scroll to center when picker is shown.
  useEffect(() => {
    if (!showMonthYearPicker) return;
    if (pickerReadyToScroll) return;

    // Use setTimeout to ensure DOM is updated and styles are applied.
    const timeoutId = setTimeout(() => {
      // Calculate spacer height based on container height
      if (monthColumnRef.current) {
        const containerHeight = monthColumnRef.current.clientHeight;
        const spacerHeightValue = containerHeight / 2 - 16 - 20;
        setSpacerHeight(spacerHeightValue);

        requestAnimationFrame(() => {
          // Scroll month column to center
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
              container.scrollTo({ top: scrollTop });
            }
          }

          // Scroll year column to center
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
              container.scrollTo({ top: scrollTop });
            }
          }
          setPickerReadyToScroll(true);
        });
      }
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showMonthYearPicker, pickerReadyToScroll]);

  // Handle scroll-based selection and snap to center on scroll end
  useEffect(() => {
    if (!showMonthYearPicker) return;
    if (!pickerReadyToScroll) return;

    let rafId: number | null = null;
    let scrollTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const snapToCenter = (container: HTMLElement, selector: string) => {
      const containerRect = container.getBoundingClientRect();
      const barCenter = containerRect.top + containerRect.height / 2;

      const items = container.querySelectorAll(
        selector,
      ) as NodeListOf<HTMLElement>;
      let closestItem: HTMLElement | null = null;
      let minDistance = Infinity;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(itemCenter - barCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      });

      if (closestItem !== null) {
        const item = closestItem as HTMLElement;
        const scrollTop =
          item.offsetTop - container.clientHeight / 2 + item.clientHeight / 2;
        container.scrollTo({ top: scrollTop, behavior: "smooth" });
      }
    };

    const handleScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        // Handle month column scroll.
        if (monthColumnRef.current) {
          const container = monthColumnRef.current;
          const containerRect = container.getBoundingClientRect();
          const barCenter = containerRect.top + containerRect.height / 2;

          const items = container.querySelectorAll(
            "[data-month-index]",
          ) as NodeListOf<HTMLElement>;
          let closestItem: HTMLElement | null = null;
          let minDistance = Infinity;

          items.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.top + itemRect.height / 2;
            const distance = Math.abs(itemCenter - barCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestItem = item;
            }
          });

          if (closestItem !== null) {
            const monthIndexAttr = (closestItem as HTMLElement).getAttribute(
              "data-month-index",
            );
            if (monthIndexAttr !== null) {
              const monthIndex = parseInt(monthIndexAttr, 10);
              if (monthIndex !== viewMonth) {
                handleSelectMonth(monthIndex);
              }
            }
          }
        }

        // Handle year column scroll.
        if (yearColumnRef.current) {
          const container = yearColumnRef.current;
          const containerRect = container.getBoundingClientRect();
          const barCenter = containerRect.top + containerRect.height / 2;

          const items = container.querySelectorAll(
            "[data-year-value]",
          ) as NodeListOf<HTMLElement>;
          let closestItem: HTMLElement | null = null;
          let minDistance = Infinity;

          items.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.top + itemRect.height / 2;
            const distance = Math.abs(itemCenter - barCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestItem = item;
            }
          });

          if (closestItem !== null) {
            const yearValueAttr = (closestItem as HTMLElement).getAttribute(
              "data-year-value",
            );
            if (yearValueAttr !== null) {
              const yearValue = parseInt(yearValueAttr, 10);
              if (yearValue !== viewYear) {
                handleSelectYear(yearValue);
              }
            }
          }
        }
      });

      // Clear existing timeout.
      if (scrollTimeoutId !== null) {
        clearTimeout(scrollTimeoutId);
      }

      // Set timeout to snap to center when scrolling ends.
      scrollTimeoutId = setTimeout(() => {
        if (monthColumnRef.current) {
          snapToCenter(monthColumnRef.current, "[data-month-index]");
        }
        if (yearColumnRef.current) {
          snapToCenter(yearColumnRef.current, "[data-year-value]");
        }
      }, 100); // 100ms after scroll stops.
    };

    if (monthColumnRef.current) {
      monthColumnRef.current.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }
    if (yearColumnRef.current) {
      yearColumnRef.current.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (scrollTimeoutId !== null) {
        clearTimeout(scrollTimeoutId);
      }
      if (monthColumnRef.current) {
        monthColumnRef.current.removeEventListener("scroll", handleScroll);
      }
      if (yearColumnRef.current) {
        yearColumnRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [
    showMonthYearPicker,
    viewMonth,
    viewYear,
    pickerReadyToScroll,
    handleSelectMonth,
    handleSelectYear,
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
                  <div
                    key={monthName}
                    data-month-index={i}
                    data-selected-month={isSelected ? "true" : undefined}
                    className={styles.calendarMonthYearPickerItem}
                  >
                    {monthName}
                  </div>
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
              {Array.from({ length: 201 }, (_, i) => {
                const year = viewYear - 100 + i;
                const isSelected = year === viewYear;
                return (
                  <div
                    key={year}
                    data-year-value={year}
                    data-selected-year={isSelected ? "true" : undefined}
                    className={styles.calendarMonthYearPickerItem}
                  >
                    {year}
                  </div>
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
