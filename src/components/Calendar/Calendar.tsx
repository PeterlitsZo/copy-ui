import dayjs from "dayjs";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { CSSProperties, FC, ReactNode } from "react";
import { useState } from "react";

import { useTheme } from "../ThemeProvider";

import styles from "./Calendar.module.scss";

export const Calendar: FC = () => {
  const theme = useTheme();

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  const computedStyle = {
    "--calendar-bg-color": theme.colors.gray["000"],
    "--calendar-border-color": theme.colors.gray["200"],
    "--calendar-border-radius": "1rem",
    "--calendar-padding": "0.75rem",
    "--calendar-header-button-hover-bg-color": theme.colors.gray["200"],
    "--calendar-main-bg-color": "white",
    "--calendar-main-cell-selected-bg-color": theme.colors.blue["600"],
    "--calendar-main-cell-selected-text-color": "white",
    "--calendar-main-cell-hover-bg-color": theme.colors.gray["100"],
  } as CSSProperties;

  // Calendar header's content.
  const header = dayjs(selectedDate)
    .year(currentYear)
    .month(currentMonth)
    .format("MMM YYYY");

  // Calendar thead's cells.
  const theadCells: ReactNode[] = [];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  for (let i = 0; i < days.length; i++) {
    theadCells.push(<th key={i}>{days[i]}</th>);
  }

  // Calendar tbody's rows and cells.
  const current = dayjs(selectedDate).year(currentYear).month(currentMonth);
  const monthStart = current.startOf("month");
  const monthEnd = current.endOf("month");
  const weeksInMonth = Math.ceil((monthEnd.date() + monthStart.day()) / 7);
  const tbodyRows: ReactNode[] = [];
  for (let week = 0; week < weeksInMonth; week++) {
    const cells: ReactNode[] = [];
    for (let day = 0; day < 7; day++) {
      const date = week * 7 + day - monthStart.day() + 1;
      const isSelected = current.date(date).isSame(selectedDate);
      if (date > 0 && date <= monthEnd.date()) {
        const handleSelectDate = () => setSelectedDate(monthStart.date(date));
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
    setCurrentYear((prev) => prev - 1);
  };
  const handleNextYear = () => {
    setCurrentYear((prev) => prev + 1);
  };
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className={styles.calendar} style={computedStyle}>
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
