import classNames from "classnames";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { Popover } from "@/components/Popover";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./select.module.scss";

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

  const theme = useTheme();
  const jss = useJss();

  const mainRef = useRef<HTMLButtonElement | null>(null);

  const [internalValue, setInternalValue] = useState<V | null>(defaultValue);
  const [mainWidth, setMainWidth] = useState(0);

  // Update internal value when `value` prop changes.
  useEffect(() => {
    setInternalValue(value ?? null);
  }, [value]);

  // Update main width on mount.
  useLayoutEffect(() => {
    const main = mainRef.current;
    if (main) {
      setMainWidth(main.offsetWidth);
    }
  }, []);

  const showLabel = internalValue
    ? options.find((o) => o.value === internalValue)?.label
    : null;

  const baseStyle = {
    "--select-list-padding": "0.25rem",
    "--select-list-item-padding-inline": "0.5rem",
    "--select-main-padding-inline":
      "calc(var(--select-list-padding) + var(--select-list-item-padding-inline))",
  };

  const mainStx = jss.hash({
    ...baseStyle,

    "--select-font-size": theme.tokens.inputBaseMdFontSize,
    "--select-line-height": theme.tokens.inputBaseMdLineHeight,

    "--select-main-height": theme.tokens.inputBaseMdHeight,
    "--select-main-border-color": theme.tokens.inputBaseDefaultBorderColor,
    "--select-main-border-radius": theme.tokens.inputBaseBorderRadius,
    "--select-main-placeholder-color": theme.tokens.inputBasePlaceholderColor,
    "--select-main-disabled-color": theme.colors.gray["600"],
    "--select-main-disabled-bg-color": theme.colors.gray["000"],
    "--select-main-disabled-border-color": theme.colors.gray["200"],
    "--select-main-focus-border-color": theme.colors.blue["800"],
  });

  const listStx = jss.hash({
    ...baseStyle,

    "--select-font-size": theme.tokens.inputBaseMdFontSize,
    "--select-line-height": theme.tokens.inputBaseMdLineHeight,

    "--select-list-width": `${mainWidth}px`,
    "--select-list-border-color": theme.tokens.inputBaseDefaultBorderColor,
    "--select-list-border-radius": theme.tokens.inputBaseBorderRadius,

    "--select-item-hover-bg-color": theme.colors.gray["000"],
  });

  return (
    <Popover>
      <Popover.Trigger
        render={({ setRef, isOpen, onToggle }) => (
          <button
            id={id}
            ref={(el) => {
              setRef(el);
              mainRef.current = el;
            }}
            className={classNames(styles.selectMain, mainStx)}
            onClick={() => !disabled && onToggle()}
            data-value-picked={internalValue == null ? undefined : "true"}
            data-disabled={disabled ? "true" : undefined}
            data-opened={isOpen ? "true" : undefined}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded="false"
          >
            <span style={{ flex: 1 }}>
              {showLabel ? showLabel : placeholder}
            </span>
            <span className={styles.selectIcon}>
              <ChevronsUpDown size="62.5%" />
            </span>
          </button>
        )}
      />
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, togglePortal, isOpen, floatingStyles }) =>
          isOpen && (
            <ul
              ref={setRef}
              className={classNames(styles.selectList, listStx)}
              style={floatingStyles}
            >
              {options.map((option) => {
                const handleClick = () => {
                  togglePortal();

                  if (!disabled) {
                    setInternalValue(option.value);
                    onChange?.(option.value);
                  }
                };
                return (
                  <li key={option.value} className={styles.selectItem}>
                    <button
                      type="button"
                      className={styles.selectItemButton}
                      onClick={handleClick}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleClick();
                        }
                      }}
                      tabIndex={0}
                    >
                      {option.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          )
        }
      />
    </Popover>
  );
};

Select.displayName = "Select";

export { Select };
