import { Clock } from "lucide-react";
import type { CSSProperties, FC } from "react";
import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Popover } from "@/components/Popover";
import { ScrollArea } from "@/components/ScrollArea";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./TimeSelector.module.scss";

export type TimeRange = {
  from: string;
  to: string;
};

export type TimeSelectorProps = {
  value?: TimeRange;
  onChange?: (value: TimeRange) => void;
};

export const TimeSelector: FC<TimeSelectorProps> = (props) => {
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

interface TimeSelectorPortalProps {
  setRef: (el: HTMLElement) => void;
  togglePortal: () => void;
  floatingStyles: CSSProperties;

  value?: TimeRange;
  onChange?: (value: TimeRange) => void;
}

const TimeSelectorPortal: FC<TimeSelectorPortalProps> = (props) => {
  const {
    setRef,
    togglePortal,
    floatingStyles,

    value,
    onChange,
  } = props;

  const theme = useTheme();

  const detailRef = useRef<HTMLDivElement | null>(null);

  const [detailHeight, setDetailHeight] = useState<number | null>(null);
  const [valueFrom, setValueFrom] = useState(value?.from || "");
  const [valueTo, setValueTo] = useState(value?.to || "");

  const fromInputId = useId();
  const toInputId = useId();

  const computedStyle = {
    "--color-border": theme.tokens.inputBaseDefaultBorderColor,
    "--radius": "0.375rem",
    "--preset-list-height": detailHeight ? `${detailHeight}px` : "0px",
    "--color-hover": theme.colors.gray["000"],
  };

  useLayoutEffect(() => {
    const detail = detailRef.current;
    if (detail) {
      setDetailHeight(detail.clientHeight);
    }
  }, []);

  const presetList = [
    { label: "Last 5 minutes", from: "now - 5m", to: "now" },
    { label: "Last 15 minutes", from: "now - 15m", to: "now" },
    { label: "Last 30 minutes", from: "now - 30m", to: "now" },
    { label: "Last 1 hour", from: "now - 1h", to: "now" },
    { label: "Last 3 hours", from: "now - 3h", to: "now" },
    { label: "Last 6 hours", from: "now - 6h", to: "now" },
    { label: "Last 12 hours", from: "now - 12h", to: "now" },
    { label: "Last 24 hours", from: "now - 24h", to: "now" },
    { label: "Last 2 days", from: "now - 2d", to: "now" },
    { label: "Last 7 days", from: "now - 7d", to: "now" },
    { label: "Last 30 days", from: "now - 30d", to: "now" },
    { label: "Last 90 days", from: "now - 90d", to: "now" },
    { label: "Last 180 days", from: "now - 180d", to: "now" },
    { label: "Last 1 year", from: "now - 1y", to: "now" },
  ];

  return (
    <div
      ref={(el) => setRef(el!)}
      className={styles.portal}
      style={{
        ...computedStyle,
        ...floatingStyles,
      }}
    >
      <div className={styles.detail} ref={detailRef}>
        <div className={styles.inputField}>
          <label htmlFor={fromInputId}>From</label>
          <Input
            id={fromInputId}
            value={valueFrom}
            style={{ width: "18rem" }}
            onChange={(e) => setValueFrom(e.target.value)}
            placeholder='The start time, e.g. "now - 15m"'
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor={toInputId}>To</label>
          <Input
            id={toInputId}
            value={valueTo}
            style={{ width: "18rem" }}
            onChange={(e) => setValueTo(e.target.value)}
            placeholder='The end time, e.g. "now"'
          />
        </div>
        <div className={styles.detailFooter}>
          <Button
            size="sm"
            variant="filled"
            onClick={() => onChange?.({ from: valueFrom, to: valueTo })}
          >
            Apply
          </Button>
          <Button size="sm" variant="ghost" onClick={() => togglePortal()}>
            Cancel
          </Button>
        </div>
      </div>
      <ScrollArea className={styles.presetListScrollArea}>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <menu className={styles.presetList}>
              {presetList.map((preset) => (
                <li key={preset.label}>
                  <button
                    type="button"
                    onClick={() =>
                      onChange?.({ from: preset.from, to: preset.to })
                    }
                  >
                    {preset.label}
                  </button>
                </li>
              ))}
            </menu>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea>
    </div>
  );
};

TimeSelectorPortal.displayName = "TimeSelector.Portal";
