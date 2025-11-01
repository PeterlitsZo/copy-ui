import classNames from "classnames";
import dayjs from "dayjs";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { FC, ReactNode } from "react";
import { useState } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";

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

  const stx = jss.hash({
    "--calendar-bg-color": theme.colors.gray["000"],
    "--calendar-border-color": theme.tokens.inputBaseDefaultBorderColor,
    "--calendar-border-radius": theme.tokens.inputBaseBorderRadius,
    "--calendar-padding": "0.75rem",
    "--calendar-header-button-hover-bg-color": theme.colors.gray["200"],
    "--calendar-main-bg-color": "white",
    "--calendar-main-cell-selected-bg-color": theme.colors.blue["600"],
    "--calendar-main-cell-selected-text-color": "white",
    "--calendar-main-cell-hover-bg-color": theme.colors.gray["100"],
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
        <span className={styles.calendarHeaderTitle}>{header}</span>
        <button type="button" onClick={handleNextMonth} aria-label="Next month">
          <ChevronRight size="1.25rem" />
        </button>
        <button type="button" onClick={handleNextYear} aria-label="Next year">
          <ChevronsRight size="1.25rem" />
        </button>
      </div>
      <table className={styles.calendarContent}>
        <thead>
          <tr>{theadCells}</tr>
        </thead>
        <tbody>{tbodyRows}</tbody>
      </table>
    </div>
  );
};
