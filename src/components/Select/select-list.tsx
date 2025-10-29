import classNames from "classnames";
import type { CSSProperties, Ref } from "react";
import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./select-list.module.scss";

type SelectListProps<V extends string> = {
  ref?: Ref<HTMLUListElement>;
  className?: string;
  style: CSSProperties;

  options: Array<{ value: V; label: string }>;
  width: number;

  onItemClicked: (value: V) => void;
};

const SelectList = <V extends string>(props: SelectListProps<V>) => {
  const { ref, className, style, options, width, onItemClicked } = props;

  const theme = useTheme();
  const jss = useJss();

  const listStx = jss.hash({
    "--select-font-size": theme.tokens.inputBaseMdFontSize,
    "--select-line-height": theme.tokens.inputBaseMdLineHeight,

    "--select-list-border-color": theme.tokens.inputBaseDefaultBorderColor,
    "--select-list-border-radius": theme.tokens.inputBaseBorderRadius,

    "--select-item-hover-bg-color": theme.colors.gray["000"],
  });

  const listWidthStx = jss.hash({
    "--select-list-width": `${width}px`,
  });

  return (
    <ul
      ref={ref}
      className={classNames(
        styles.selectList,
        listStx,
        listWidthStx,
        className,
      )}
      style={style}
    >
      {options.map((option) => {
        return (
          <li key={option.value} className={styles.selectItem}>
            <button
              type="button"
              className={styles.selectItemButton}
              onClick={() => onItemClicked(option.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onItemClicked(option.value);
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
  );
};

SelectList.displayName = "Select.List";

export { SelectList };
