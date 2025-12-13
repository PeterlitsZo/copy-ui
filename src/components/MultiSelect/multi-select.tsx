import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useJss } from "@/components/CopyUiProvider";
import { Popover, type PopoverTriggerRender } from "@/components/Popover";

import { MultiSelectList } from "./multi-select-list";
import { MultiSelectTrigger } from "./multi-select-trigger";

interface SelectProps<V extends string> {
  id?: string;
  value?: V[] | null;
  defaultValue?: V[] | null;

  options: Array<{ value: V; label: string }>;
  placeholder?: string;
  disabled?: boolean;

  onChange?: (value: V[] | null) => void;
}

const MultiSelect = <V extends string>(props: SelectProps<V>) => {
  const {
    id,
    value = null,
    defaultValue = null,

    options,
    placeholder = "Select options",
    disabled = false,

    onChange,
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
    "--select-list-padding": "0.25rem",
    "--select-list-item-padding-inline": "0.5rem",
    "--select-trigger-padding-right":
      "calc(var(--select-list-padding) + var(--select-list-item-padding-inline))",
    "--select-trigger-padding-left":
      internalValueRef.current != null
        ? "calc(var(--select-list-padding) + var(--select-list-item-padding-inline) - 0.25rem)"
        : "calc(var(--select-list-padding) + var(--select-list-item-padding-inline))",
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
      <Popover.Trigger render={popoverTriggerRender} />
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, togglePortal, isOpen, floatingStyles }) =>
          isOpen && (
            <MultiSelectList
              ref={setRef}
              className={baseStx}
              style={floatingStyles}
              options={options}
              internalValue={internalValueRef.current}
              width={triggerWidth}
              onItemClicked={(v) => {
                togglePortal();

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
