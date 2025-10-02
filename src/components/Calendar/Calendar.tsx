import { useState, type CSSProperties, type FC, type ReactNode } from "react";
import dayjs from "dayjs";

import { useTheme } from "../ThemeProvider";

import styles from "./Calendar.module.scss";

export const Calendar: FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const theme = useTheme();

  const computedStyle = {
    '--calendar-bg-color': theme.colors.gray['000'],
    '--calendar-border-color': theme.colors.gray['200'],
    '--calendar-border-radius': '1rem',
    '--calendar-padding': '0.5rem',
    '--calendar-main-bg-color': 'white',
    '--calendar-main-cell-selected-bg-color': theme.colors.blue['600'],
    '--calendar-main-cell-selected-text-color': 'white',
    '--calendar-main-cell-hover-bg-color': theme.colors.gray['100'],
  } as CSSProperties;

  const header = dayjs().format('MMMM YYYY');

  const theadCells: ReactNode[] = [];
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  for (let i = 0; i < days.length; i++) {
    theadCells.push(<th key={i}>{days[i]}</th>);
  }

  const now = dayjs();
  const monthStart = now.startOf('month');
  const monthEnd = now.endOf('month');
  const weeksInMonth = Math.ceil((monthEnd.date() + monthStart.day()) / 7);
  const tbodyRows: ReactNode[] = [];
  for (let week = 0; week < weeksInMonth; week++) {
    const cells: ReactNode[] = [];
    for (let day = 0; day < 7; day++) {
      const date = week * 7 + day - monthStart.day() + 1;
      const isSelected = date === selectedDate.date();
      if (date > 0 && date <= monthEnd.date()) {
        cells.push(
          <td key={day} data-selected={isSelected} onClick={() => setSelectedDate(monthStart.date(date))}>
            <span>{date}</span>
          </td>
        );
      } else {
        cells.push(<td key={day}></td>);
      }
    }
    tbodyRows.push(<tr key={week}>{cells}</tr>);
  }

  return (
    <div className={styles.calendar} style={computedStyle}>
      <div className={styles.calendarHeader}>{header}</div>
      <table className={styles.calendarContent}>
        <thead>
          <tr>{theadCells}</tr>
        </thead>
        <tbody>{tbodyRows}</tbody>
      </table>
    </div>
  );
}
