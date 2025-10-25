import type dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import type { FC } from "react";
import { Calendar } from "@/components/Calendar";
import { Popover } from "@/components/Popover";
import styles from "./calendar-opener.module.scss";

type CalendarOpenerProps = {
  value?: dayjs.Dayjs | null;
  onChange?: (day: dayjs.Dayjs) => void;
};

const CalendarOpener: FC<CalendarOpenerProps> = (props) => {
  const { value, onChange } = props;

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
              <Calendar value={value} onChange={onChange} />
            </div>
          )
        }
      />
    </Popover>
  );
};

export { CalendarOpener };
