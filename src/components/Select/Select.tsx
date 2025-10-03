import { ChevronsUpDown } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Popover } from "@/components/Popover";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./Select.module.scss";

interface SelectProps<V extends string> {
  value?: V | null;

  options: Array<{ value: V; label: string }>;
  placeholder?: string;
  disabled?: boolean;

  onChange?: (value: V) => void;
}

const Select = <V extends string>(props: SelectProps<V>) => {
  const {
    value = null,

    options,
    placeholder = "Select an option",
    disabled = false,

    onChange,
  } = props;

  const theme = useTheme();

  const mainRef = useRef<HTMLButtonElement | null>(null);

  const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(
    value,
  );
  const showLabel = selectedOptionValue
    ? options.find((o) => o.value === selectedOptionValue)?.label
    : null;

  const [mainWidth, setMainWidth] = useState(0);

  useEffect(() => {
    if (value === selectedOptionValue) return;
    setSelectedOptionValue(value ?? null);
  }, [value, selectedOptionValue]);

  const mainStyle = {
    "--select-font-size": theme.tokens.inputBaseMdFontSize,
    "--select-line-height": theme.tokens.inputBaseMdLineHeight,

    "--select-main-height": theme.tokens.inputBaseMdHeight,
    "--select-main-border-color": theme.tokens.inputBaseDefaultBorderColor,
    "--select-main-border-radius": theme.tokens.inputBaseBorderRadius,
    "--select-main-placeholder-color": theme.tokens.inputBasePlaceholderColor,

    "--select-main-disabled-color": theme.colors.gray["600"],
    "--select-main-disabled-bg-color": theme.colors.gray["000"],
    "--select-main-disabled-border-color": theme.colors.gray["200"],
  };

  const listStyle = {
    "--select-font-size": theme.tokens.inputBaseMdFontSize,
    "--select-line-height": theme.tokens.inputBaseMdLineHeight,

    "--select-list-width": `${mainWidth}px`,
    "--select-list-border-color": theme.tokens.inputBaseDefaultBorderColor,
    "--select-list-border-radius": theme.tokens.inputBaseBorderRadius,

    "--select-item-hover-bg-color": theme.colors.gray["000"],
  };

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (main) {
      setMainWidth(main.offsetWidth);
    }
  }, []);

  return (
    <Popover>
      <Popover.Trigger
        render={({ setRef, onToggle }) => (
          <button
            ref={(el) => {
              setRef(el);
              mainRef.current = el;
            }}
            className={styles.selectMain}
            style={mainStyle as CSSProperties}
            onClick={() => !disabled && onToggle()}
            data-value-picked={selectedOptionValue == null ? "false" : "true"}
            data-disabled={disabled ? "true" : "false"}
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
              className={styles.selectList}
              style={{ ...listStyle, ...floatingStyles }}
            >
              {options.map((option) => {
                const handleClick = () => {
                  togglePortal();

                  if (!disabled) {
                    setSelectedOptionValue(option.value);
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
