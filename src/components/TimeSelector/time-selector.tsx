import { Clock } from "lucide-react";
import type { FC } from "react";
import { useMemo } from "react";

import { Button } from "@/components/Button";
import { Popover } from "@/components/Popover";

import { TimeSelectorPortal } from "./time-selector-portal";

export type TimeRange = {
  from: string;
  to: string;
};

export type TimeSelectorProps = {
  value?: TimeRange;
  onChange?: (value: TimeRange) => void;
};

const TimeSelector: FC<TimeSelectorProps> = (props) => {
  const { value, onChange } = props;

  const showTitle = useMemo(() => {
    if (value) {
      if (value.to === "now" && /now - \d+(m|h|d|y)/.test(value.from)) {
        const regex = /now - (\d+)(m|h|d|y)/;
        const match = value.from.match(regex);
        if (match) {
          const amount = match[1];
          const unit = match[2];
          let unitFull = "";
          switch (unit) {
            case "m":
              unitFull = amount === "1" ? "minute" : "minutes";
              break;
            case "h":
              unitFull = amount === "1" ? "hour" : "hours";
              break;
            case "d":
              unitFull = amount === "1" ? "day" : "days";
              break;
            case "y":
              unitFull = amount === "1" ? "year" : "years";
              break;
          }
          return `Last ${amount} ${unitFull}`;
        } else {
          throw new Error("Invalid time range format");
        }
      }
    }
    return "Select Time";
  }, [value]);

  return (
    <Popover>
      <Popover.Trigger
        render={({ setRef, onToggle }) => (
          <Button
            ref={(el) => {
              el && setRef(el);
              return;
            }}
            leftSection={<Clock size="1.25rem" />}
            onClick={onToggle}
          >
            <span>{showTitle}</span>
          </Button>
        )}
      />
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, togglePortal, isOpen, floatingStyles }) =>
          isOpen && (
            <TimeSelectorPortal
              setRef={setRef}
              togglePortal={togglePortal}
              floatingStyles={floatingStyles}
              value={value}
              onChange={(v) => {
                onChange?.(v);
                togglePortal();
              }}
            />
          )
        }
      />
    </Popover>
  );
};

TimeSelector.displayName = "TimeSelector";

export { TimeSelector };
