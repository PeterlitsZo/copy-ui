import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { Popover } from "@/components/Popover";

import { SelectList } from "./select-list";
import { SelectTrigger } from "./select-trigger";

interface SelectProps<V extends string> {
  id?: string;
  value?: V | null;
  defaultValue?: V | null;

  options: Array<{ value: V; label: string }>;
  placeholder?: string;
  disabled?: boolean;

  onChange?: (value: V) => void;
}

const Select = <V extends string>(props: SelectProps<V>) => {
  const {
    id,
    value = null,
    defaultValue = null,

    options,
    placeholder = "Select an option",
    disabled = false,

    onChange,
  } = props;

  const jss = useJss();

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const [internalValue, setInternalValue] = useState<V | null>(defaultValue);
  const [mainWidth, setMainWidth] = useState(0);

  // Update internal value when `value` prop changes.
  useEffect(() => {
    setInternalValue(value ?? null);
  }, [value]);

  // Update main width on mount.
  useLayoutEffect(() => {
    const main = triggerRef.current;
    if (main) {
      setMainWidth(main.offsetWidth);
    }
  }, []);

  const showLabel = internalValue
    ? (options.find((o) => o.value === internalValue)?.label ?? null)
    : null;

  const baseStx = jss.hash({
    "--select-list-padding": "0.25rem",
    "--select-list-item-padding-inline": "0.5rem",
    "--select-main-padding-inline":
      "calc(var(--select-list-padding) + var(--select-list-item-padding-inline))",
  });

  return (
    <Popover>
      <Popover.Trigger
        render={({ setRef, isOpen, onToggle }) => (
          <SelectTrigger
            id={id}
            ref={(el) => {
              setRef(el);
              triggerRef.current = el;
            }}
            placeholder={placeholder}
            className={baseStx}
            disabled={disabled}
            isOpen={isOpen}
            onToggle={onToggle}
            showLabel={showLabel}
          />
        )}
      />
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, togglePortal, isOpen, floatingStyles }) =>
          isOpen && (
            <SelectList
              ref={setRef}
              className={baseStx}
              style={floatingStyles}
              options={options}
              width={mainWidth}
              onItemClicked={(v) => {
                togglePortal();

                if (!disabled) {
                  setInternalValue(v);
                  onChange?.(v);
                }
              }}
            />
          )
        }
      />
    </Popover>
  );
};

Select.displayName = "Select";

export { Select };
