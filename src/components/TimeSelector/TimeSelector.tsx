import { useContext, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type FC } from "react";
import { Clock } from "lucide-react";

import { Button } from "../Button";
import { Popover } from "../Popover";
import { ThemeContext } from "../ThemeProvider";

import styles from "./TimeSelector.module.scss";
import { Input } from "../Input";

export type TimeRange = {
  from: string;
  to: string;
}

export type TimeSelectorProps = {
  value?: TimeRange;
  onChange?: (value: TimeRange) => void;
};

export const TimeSelector: FC<TimeSelectorProps> = (props) => {
  const {
    value,
    onChange,
  } = props;

  const showTitle = useMemo(() => {
    if (value) {
      if (value.to === 'now' && /now - \d+(m|h|d|y)/.test(value.from)) {
        let regex = /now - (\d+)(m|h|d|y)/;
        let match = value.from.match(regex);
        if (match) {
          let amount = match[1];
          let unit = match[2];
          let unitFull = '';
          switch (unit) {
            case 'm':
              unitFull = amount === '1' ? 'minute' : 'minutes';
              break;
            case 'h':
              unitFull = amount === '1' ? 'hour' : 'hours';
              break;
            case 'd':
              unitFull = amount === '1' ? 'day' : 'days';
              break;
            case 'y':
              unitFull = amount === '1' ? 'year' : 'years';
              break;
          }
          return `Last ${amount} ${unitFull}`;
        } else {
          throw new Error('Invalid time range format');
        }
      }
    }
    return 'Select Time';
  }, [value]);

  return (
    <Popover>
      <Popover.Trigger
        render={({ setRef, onClick }) => (
          <Button
            ref={(el) => { el && setRef(el); return; }}
            leftSection={<Clock size='1.25rem' />}
            onClick={onClick}
          >
            <span>{showTitle}</span>
          </Button>
        )}
      />
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, togglePortal, isOpen, floatingStyles }) => (
          isOpen && (
            <TimeSelectorPortal
              setRef={setRef}
              togglePortal={togglePortal}
              floatingStyles={floatingStyles}
              value={value}
              onChange={(v) => { onChange?.(v); togglePortal() }}
            />
          )
        )}
      />
    </Popover>
  );
}

TimeSelector.displayName = 'TimeSelector';

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

  const theme = useContext(ThemeContext);

  const detailRef = useRef<HTMLDivElement | null>(null);

  const [detailHeight, setDetailHeight] = useState<number | null>(null);
  const [valueFrom, setValueFrom] = useState(value?.from || '');
  const [valueTo, setValueTo] = useState(value?.to || '');

  const computedStyle = {
    '--color-border': theme.colors.gray['100'],
    '--radius': '0.375rem',
    '--preset-list-height': detailHeight ? `${detailHeight}px` : '0px',
    '--color-hover': theme.colors.gray['000'],
  };

  useLayoutEffect(() => {
    const detail = detailRef.current;
    if (detail) {
      setDetailHeight(detail.clientHeight);
    }
  }, []);

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
          <label>From</label>
          <Input value={valueFrom} onChange={(e) => setValueFrom(e.target.value)} />
        </div>
        <div className={styles.inputField}>
          <label>To</label>
          <Input value={valueTo} onChange={(e) => setValueTo(e.target.value)} />
        </div>
        <div className={styles.detailFooter}>
          <Button
            variant="filled"
            onClick={() => onChange?.({ from: valueFrom, to: valueTo })}
          >
            Apply
          </Button>
          <Button variant="default" onClick={() => togglePortal()}>
            Cancel
          </Button>
        </div>
      </div>
      <menu className={styles.presetList}>
        <li onClick={() => onChange?.({ from: 'now - 5m', to: 'now' })}>Last 5 minutes</li>
        <li onClick={() => onChange?.({ from: 'now - 15m', to: 'now' })}>Last 15 minutes</li>
        <li onClick={() => onChange?.({ from: 'now - 30m', to: 'now' })}>Last 30 minutes</li>
        <li onClick={() => onChange?.({ from: 'now - 1h', to: 'now' })}>Last 1 hour</li>
        <li onClick={() => onChange?.({ from: 'now - 3h', to: 'now' })}>Last 3 hours</li>
        <li onClick={() => onChange?.({ from: 'now - 6h', to: 'now' })}>Last 6 hours</li>
        <li onClick={() => onChange?.({ from: 'now - 12h', to: 'now' })}>Last 12 hours</li>
        <li onClick={() => onChange?.({ from: 'now - 24h', to: 'now' })}>Last 24 hours</li>
        <li onClick={() => onChange?.({ from: 'now - 2d', to: 'now' })}>Last 2 days</li>
        <li onClick={() => onChange?.({ from: 'now - 7d', to: 'now' })}>Last 7 days</li>
        <li onClick={() => onChange?.({ from: 'now - 30d', to: 'now' })}>Last 30 days</li>
        <li onClick={() => onChange?.({ from: 'now - 90d', to: 'now' })}>Last 90 days</li>
        <li onClick={() => onChange?.({ from: 'now - 180d', to: 'now' })}>Last 180 days</li>
        <li onClick={() => onChange?.({ from: 'now - 1y', to: 'now' })}>Last 1 year</li>
      </menu>
    </div>
  )
}

TimeSelectorPortal.displayName = 'TimeSelector.Portal';