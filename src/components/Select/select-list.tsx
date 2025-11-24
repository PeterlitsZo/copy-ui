import classNames from "classnames";
import { Check, Inbox } from "lucide-react";
import type { CSSProperties, FC, Ref } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { ScrollArea } from "@/components/ScrollArea";

import styles from "./select-list.module.scss";

type SelectListProps<V extends string> = {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  style: CSSProperties;

  options: Array<{ value: V; label: string }>;
  internalValue?: V | null;
  width: number;

  onItemClicked: (value: V) => void;
};

const SelectList = <V extends string>(props: SelectListProps<V>) => {
  const {
    ref,
    className,
    style,
    options,
    internalValue,
    width,
    onItemClicked,
  } = props;

  const jss = useJss();

  const listStx = jss.hash({
    "--selectList-fontSize": "var(--select-fontSize)",
    "--selectList-lineHeight": "var(--select-lineHeight)",
    "--selectList-bdColor": "var(--select-borderColor)",
    "--selectList-bdRadius": "var(--select-borderRadius)",
    "--selectList-p": "0.25rem",
  });

  const listWidthStx = jss.hash({
    "--selectList-w": `${width}px`,
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
          {options.length > 0 && (
            <ul className={classNames(styles.selectList)}>
              {options.map((option) => {
                return (
                  <SelectItem
                    key={option.value}
                    marked={option.value === internalValue}
                    label={option.label}
                    onChoose={() => onItemClicked(option.value)}
                  />
                );
              })}
            </ul>
          )}
          {options.length === 0 && <EmptyState />}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.ScrollbarWithThumb />
    </ScrollArea>
  );
};

SelectList.displayName = "Select.List";

type SelectItemProps = {
  marked: boolean;
  label: string;
  onChoose: () => void;
};

const SelectItem: FC<SelectItemProps> = (props) => {
  const { marked, label, onChoose } = props;

  const jss = useJss();
  const theme = useTheme();
  const stx = jss.hash({
    "--selectItem-markColor": theme.colors.gray["600"],
    "--selectItem-hover-bgColor": theme.colors.gray["000"],
    "--selectItem-px": "0.5rem",
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

const EmptyState: FC = () => {
  const jss = useJss();
  const theme = useTheme();
  const stx = jss.hash({
    "--emptyState-color": theme.colors.gray["600"],
    "--emptyStateIcon-color": theme.colors.gray["900"],
    "--emptyStateIcon-bgColor": theme.colors.gray["100"],
  });

  return (
    <div className={classNames(styles.emptyState, stx)}>
      <div className={styles.emptyStateIcon}>
        <Inbox size="1.5rem" />
      </div>
      <div>No options here...</div>
    </div>
  );
};

export { SelectList };
