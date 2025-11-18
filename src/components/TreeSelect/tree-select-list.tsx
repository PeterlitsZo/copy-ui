import classNames from "classnames";
import { Check, ChevronRight } from "lucide-react";
import type { CSSProperties, ReactElement, Ref } from "react";
import { useState } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { ScrollArea } from "@/components/ScrollArea";

import styles from "./tree-select-list.module.scss";

type OptionLeafNode<V extends string> = {
  value: V;
  label: string;
};

type OptionNonLeafNode<V extends string> = {
  label: string;
  children: Array<OptionNode<V>>;
};

type OptionNode<V extends string> = OptionLeafNode<V> | OptionNonLeafNode<V>;

type TreeSelectListProps<V extends string> = {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  style: CSSProperties;

  options: Array<OptionNode<V>>;
  internalValue?: V | null;
  width: number;

  onItemClicked: (value: V) => void;
};

const TreeSelectList = <V extends string>(props: TreeSelectListProps<V>) => {
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
            {options.map((option, index) => {
              return (
                <TreeSelectItem
                  key={"value" in option ? option.value : `group-${index}`}
                  option={option}
                  internalValue={internalValue}
                  onItemClicked={onItemClicked}
                  level={0}
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

TreeSelectList.displayName = "TreeSelect.List";

type TreeSelectItemProps<V extends string> = {
  option: OptionNode<V>;
  internalValue?: V | null;
  onItemClicked: (value: V) => void;
  level: number;
};

const TreeSelectItem = <V extends string>(
  props: TreeSelectItemProps<V>,
): ReactElement => {
  const { option, internalValue, onItemClicked, level } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const jss = useJss();
  const theme = useTheme();

  const isLeaf = "value" in option;
  const marked = isLeaf && option.value === internalValue;

  const handleClick = () => {
    if (isLeaf) {
      onItemClicked(option.value);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const indentRem = level * 0.75 + (isLeaf ? 1 : 0) * 1.125;

  const stx = jss.hash({
    "--select-item-mark-color": theme.colors.gray["600"],
    "--select-item-indent": `${indentRem}rem`,
  });

  return (
    <>
      <li className={classNames(styles.selectItem, stx)}>
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
          {!isLeaf && (
            <span
              className={styles.selectItemChevron}
              style={{ transform: isExpanded ? "rotate(90deg)" : "none" }}
            >
              <ChevronRight />
            </span>
          )}
          <span>{option.label}</span>
          {marked && <Check />}
        </button>
      </li>
      {!isLeaf &&
        isExpanded &&
        option.children.map((child, index) => (
          <TreeSelectItem
            key={"value" in child ? child.value : `group-${level}-${index}`}
            option={child}
            internalValue={internalValue}
            onItemClicked={onItemClicked}
            level={level + 1}
          />
        ))}
    </>
  );
};

export { TreeSelectList };
