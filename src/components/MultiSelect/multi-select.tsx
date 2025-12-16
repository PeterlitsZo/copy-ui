import {
  type ComponentProps,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useJss } from "@/components/CopyUiProvider";
import type { IbsBase } from "@/components/IbsBase";
import { Popover, type PopoverTriggerRender } from "@/components/Popover";

import { MultiSelectList } from "./multi-select-list";
import {
  MultiSelectTrigger,
  TriggerIbsBasePropsContext,
} from "./multi-select-trigger";

type MultiSelectProps<V extends string> = Omit<
  ComponentProps<typeof IbsBase>,
  "onChange"
> & {
  id?: string;
  value?: V[] | null;
  defaultValue?: V[] | null;

  options: Array<{ value: V; label: string }>;
  placeholder?: string;
  disabled?: boolean;

  onChange?: (value: V[] | null) => void;
};

const MultiSelect = <V extends string>(props: MultiSelectProps<V>) => {
  const {
    id,
    value = null,
    defaultValue = null,

    options,
    placeholder = "Select options",
    disabled = false,

    onChange,

    ...rest
  } = props;

  const jss = useJss();

  const [triggerEl, setTriggerEl] = useState<HTMLDivElement | null>(null);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const internalValueRef = useRef<V[] | null>(defaultValue);
  const showLabelsRef = useRef<string[] | null>(null);

  const updateShowLabelsByInternalValue = useCallback(() => {
    if (internalValueRef.current != null) {
      showLabelsRef.current = internalValueRef.current
        .map((v) => options.find((o) => o.value === v)?.label ?? null)
        .filter((l) => l != null) as string[];
    } else {
      showLabelsRef.current = null;
    }
  }, [options]);

  // Update internal value when `value` prop changes.
  useEffect(() => {
    if (value !== internalValueRef.current) {
      internalValueRef.current = value ?? null;
    }
  }, [value]);

  // Update trigger width on mount and resize.
  useLayoutEffect(() => {
    if (triggerEl) {
      setTriggerWidth(triggerEl.offsetWidth);

      const ro = new ResizeObserver(() => {
        const width = triggerEl.offsetWidth;
        if (width) {
          setTriggerWidth(triggerEl.offsetWidth);
        }
      });
      ro.observe(triggerEl);

      return () => {
        ro.disconnect();
      };
    }
  }, [triggerEl]);

  const baseStx = jss.hash({
    "--multiSelect-listP": "0.25rem",
    "--multiSelect-listItemPx": "0.5rem",
    "--multiSelect-triggerPl":
      internalValueRef.current != null
        ? "calc(var(--multiSelect-listP) + var(--multiSelect-listItemPx) - 0.25rem)"
        : "calc(var(--multiSelect-listP) + var(--multiSelect-listItemPx))",
  });

  const popoverTriggerRender: PopoverTriggerRender = useCallback(
    ({ setRef, isOpen, onToggle }) => {
      return (
        <MultiSelectTrigger
          id={id}
          ref={(el) => {
            setRef(el);
            setTriggerEl(el);
          }}
          placeholder={placeholder}
          className={baseStx}
          disabled={disabled}
          isOpen={isOpen}
          onToggle={onToggle}
          showLabels={showLabelsRef.current}
        />
      );
    },
    [id, placeholder, baseStx, disabled],
  );

  return (
    <Popover>
      <TriggerIbsBasePropsContext value={rest}>
        <Popover.Trigger render={popoverTriggerRender} />
      </TriggerIbsBasePropsContext>
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, isOpen, floatingStyles }) =>
          isOpen && (
            <MultiSelectList
              ref={setRef}
              className={baseStx}
              style={floatingStyles}
              options={options}
              internalValue={internalValueRef.current}
              width={triggerWidth}
              onItemClicked={(v) => {
                if (!disabled) {
                  const prev = internalValueRef.current ?? [];
                  if (prev.includes(v)) {
                    internalValueRef.current = prev.filter((val) => val !== v);
                  } else {
                    internalValueRef.current = [...prev, v];
                  }
                  onChange?.(internalValueRef.current);
                  updateShowLabelsByInternalValue();
                }
              }}
            />
          )
        }
      />
    </Popover>
  );
};

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
