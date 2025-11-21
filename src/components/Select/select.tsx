import classNames from "classnames";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { Popover, type PopoverTriggerRender } from "@/components/Popover";
import { resolveStyle } from "@/utils/resolve-style";

import { SelectList } from "./select-list";
import { SelectTrigger } from "./select-trigger";

interface SelectProps<V extends string> {
  id?: string;
  value?: V | null;
  defaultValue?: V | null;

  width?: "sm" | "md" | "lg" | "full";

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
    width = "md",
    options,
    placeholder = "Select an option",
    disabled = false,
    onChange,
  } = props;

  const jss = useJss();

  const [triggerEl, setTriggerEl] = useState<HTMLButtonElement | null>(null);

  const [internalValue, setInternalValue] = useState<V | null>(defaultValue);
  const [triggerWidth, setTriggerWidth] = useState(0);

  // Update internal value when `value` prop changes.
  useEffect(() => {
    setInternalValue(value ?? null);
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

  const showLabel = internalValue
    ? (options.find((o) => o.value === internalValue)?.label ?? null)
    : null;

  const baseStx = jss.hash({
    "--select-list-padding": "0.25rem",
    "--select-list-item-padding-inline": "0.5rem",
    "--select-main-padding-inline":
      "calc(var(--select-list-padding) + var(--select-list-item-padding-inline))",
  });

  const widthStx = jss.hash(
    resolveStyle({
      base: {},
      variants: {
        width: {
          sm: { "--select-trigger-width": "12rem" },
          md: { "--select-trigger-width": "16rem" },
          lg: { "--select-trigger-width": "20rem" },
          full: { "--select-trigger-width": "100%" },
        },
      },
      cls: {
        width,
      },
    }),
  );

  const popoverTriggerRender: PopoverTriggerRender = useCallback(
    ({ setRef, isOpen, onToggle }) => (
      <SelectTrigger
        id={id}
        ref={(el) => {
          setRef(el);
          setTriggerEl(el);
        }}
        placeholder={placeholder}
        className={classNames(baseStx, widthStx)}
        disabled={disabled}
        isOpen={isOpen}
        onToggle={onToggle}
        showLabel={showLabel}
      />
    ),
    [id, placeholder, baseStx, widthStx, disabled, showLabel],
  );

  return (
    <Popover>
      <Popover.Trigger render={popoverTriggerRender} />
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, togglePortal, isOpen, floatingStyles }) =>
          isOpen && (
            <SelectList
              ref={setRef}
              className={baseStx}
              style={floatingStyles}
              options={options}
              internalValue={internalValue}
              width={triggerWidth}
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
