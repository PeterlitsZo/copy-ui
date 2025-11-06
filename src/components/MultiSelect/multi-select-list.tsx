import classNames from "classnames";
import { Check } from "lucide-react";
import type { CSSProperties, FC, Ref } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { ScrollArea } from "@/components/ScrollArea";

import styles from "./multi-select-list.module.scss";

type MultiSelectListProps<V extends string> = {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  style: CSSProperties;

  options: Array<{ value: V; label: string }>;
  internalValue?: V[] | null;
  width: number;

  onItemClicked: (value: V) => void;
};

const MultiSelectList = <V extends string>(props: MultiSelectListProps<V>) => {
  const {
    ref,
    className,
    style,
    options,
    internalValue,
    width,
    onItemClicked,
  } = props;

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

  const viewStx = jss.hash({
    maxHeight: "15rem",
  });

  return (
    <ScrollArea
      ref={ref}
      style={style}
      className={classNames(
        styles.selectListContainer,
        listStx,
        listWidthStx,
        className,
      )}
    >
      <ScrollArea.Viewport className={viewStx}>
        <ScrollArea.Content>
          <ul className={classNames(styles.selectList)}>
            {options.map((option) => {
              return (
                <MultiSelectItem
                  key={option.value}
                  marked={internalValue?.includes(option.value) ?? false}
                  label={option.label}
                  onChoose={() => onItemClicked(option.value)}
                />
              );
            })}
          </ul>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.ScrollbarWithThumb />
    </ScrollArea>
  );
};

MultiSelectList.displayName = "MultiSelect.List";

type MultiSelectItemProps = {
  marked: boolean;
  label: string;
  onChoose: () => void;
};

const MultiSelectItem: FC<MultiSelectItemProps> = (props) => {
  const { marked, label, onChoose } = props;

  const jss = useJss();
  const theme = useTheme();
  const stx = jss.hash({
    "--select-item-mark-color": theme.colors.gray["600"],
  });

  return (
    <li className={classNames(styles.selectItem, stx)}>
      <button
        type="button"
        className={styles.selectItemButton}
        onClick={() => onChoose()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChoose();
          }
        }}
        tabIndex={0}
      >
        <span>{label}</span>
        {marked && <Check />}
      </button>
    </li>
  );
};

export { MultiSelectList };
