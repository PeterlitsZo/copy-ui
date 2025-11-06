import {
  type CSSProperties,
  type FC,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/Button";
import { useTheme } from "@/components/CopyUiProvider";
import { Field } from "@/components/Field";
import { ScrollArea } from "@/components/ScrollArea";

import type { TimeRange } from "./time-selector";
import styles from "./time-selector-portal.module.scss";

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
        <Field>
          <Field.Label htmlFor={fromInputId}>From</Field.Label>
          <Field.Input
            id={fromInputId}
            value={valueFrom}
            style={{ width: "16rem" }}
            onChange={(e) => setValueFrom(e.target.value)}
            placeholder="Enter the start time"
          />
          <Field.Description>
            E.g. "now - 15m", "now - 1h", etc.
          </Field.Description>
        </Field>
        <Field>
          <Field.Label htmlFor={toInputId}>To</Field.Label>
          <Field.Input
            id={toInputId}
            value={valueTo}
            style={{ width: "16rem" }}
            onChange={(e) => setValueTo(e.target.value)}
            placeholder="Enter the end time"
          />
          <Field.Description>E.g. "now"</Field.Description>
        </Field>
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

export { TimeSelectorPortal };
