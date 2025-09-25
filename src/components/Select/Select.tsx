import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FC } from "react"
import { Popover } from "../Popover";

import { useTheme } from "../ThemeProvider";

import styles from "./Select.module.scss";
import { ChevronsUpDown } from "lucide-react";

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
    placeholder = 'Select an option',
    disabled = false,

    onChange,
  } = props;

  const theme = useTheme();

  const mainRef = useRef<HTMLDivElement | null>(null);

  const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(value);
  const showLabel = selectedOptionValue ? options.find(o => o.value === selectedOptionValue)?.label : null;

  const [mainWidth, setMainWidth] = useState(0);

  useEffect(() => {
    if (value === selectedOptionValue) return;
    setSelectedOptionValue(value ?? null);
  }, [value]);

  const mainStyle = {
    '--select-font-size': theme.tokens.inputBaseMdFontSize,
    '--select-line-height': theme.tokens.inputBaseMdLineHeight,

    '--select-main-height': theme.tokens.inputBaseMdHeight,
    '--select-main-border-color': theme.tokens.inputBaseDefaultBorderColor,
    '--select-main-border-radius': theme.tokens.inputBaseBorderRadius,
    '--select-main-placeholder-color': theme.tokens.inputBasePlaceholderColor,

    '--select-main-disabled-color': theme.colors.gray['600'],
    '--select-main-disabled-bg-color': theme.colors.gray['000'],
    '--select-main-disabled-border-color': theme.colors.gray['200'],
  }

  const listStyle = {
    '--select-font-size': theme.tokens.inputBaseMdFontSize,
    '--select-line-height': theme.tokens.inputBaseMdLineHeight,

    '--select-list-width': `${mainWidth}px`,
    '--select-list-border-color': theme.tokens.inputBaseDefaultBorderColor,
    '--select-list-border-radius': theme.tokens.inputBaseBorderRadius,

    '--select-item-hover-bg-color': theme.colors.gray['000'],
  }

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (main) {
      setMainWidth(main.offsetWidth);
    }
  }, []);

  return (
    <Popover>
      <Popover.Trigger
        render={({ setRef, onClick }) => (
          <div
            ref={(el) => { setRef(el); mainRef.current = el; }}
            className={styles.selectMain}
            style={mainStyle as CSSProperties}
            onClick={(e) => !disabled && onClick(e)}

            data-value-picked={selectedOptionValue == null ? "false" : "true"}
            data-disabled={disabled ? "true" : "false"}
          >
            <span style={{ flex: 1 }}>
              {showLabel ? showLabel : placeholder}
            </span>
            <span className={styles.selectIcon}>
              <ChevronsUpDown size='62.5%' />
            </span>
          </div>
        )}
      />
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, togglePortal, isOpen, floatingStyles }) => (
          isOpen && (
            <ul
              ref={setRef}
              className={styles.selectList}
              style={{ ...listStyle, ...floatingStyles }}
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  className={styles.selectItem}
                  onClick={() => {
                    togglePortal();

                    if (!disabled) {
                      setSelectedOptionValue(option.value);
                      onChange?.(option.value);
                    }
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )
        )}
      />
    </Popover>
  )
}

Select.displayName = "Select";

export { Select };
