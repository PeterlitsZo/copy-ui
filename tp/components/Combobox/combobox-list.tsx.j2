import classNames from "classnames";
import { Check, Inbox } from "lucide-react";
import {
  type CSSProperties,
  type FC,
  type Ref,
  useEffect,
  useRef,
} from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { ScrollArea } from "@/components/ScrollArea";

import styles from "./combobox-list.module.scss";

type ComboboxListProps<V extends string> = {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  style: CSSProperties;

  options: Array<{ value: V; label: string }>;
  internalValue?: V | null;
  width: number;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  isLoading: boolean;

  onItemClicked: (value: V) => void;
};

const ComboboxList = <V extends string>(props: ComboboxListProps<V>) => {
  const {
    ref,
    className,
    style,
    options,
    internalValue,
    width,
    searchQuery,
    onSearchQueryChange,
    isLoading,
    onItemClicked,
  } = props;

  const jss = useJss();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when list opens
  useEffect(() => {
    // Use setTimeout to ensure the input is rendered
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

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
    <div
      ref={ref}
      style={style}
      className={classNames(
        styles.comboboxListContainer,
        listStx,
        listWidthStx,
        className,
      )}
    >
      <input
        ref={searchInputRef}
        value={searchQuery}
        placeholder="Search..."
        className={styles.comboboxListInput}
        onChange={(e) => onSearchQueryChange(e.target.value)}
      />
      <ScrollArea>
        <ScrollArea.Viewport className={viewStx}>
          <ScrollArea.Content>
            {isLoading ? (
              <LoadingState />
            ) : options.length > 0 ? (
              <ul className={classNames(styles.comboboxList)}>
                {options.map((option) => {
                  return (
                    <ComboboxItem
                      key={option.value}
                      marked={option.value === internalValue}
                      label={option.label}
                      onChoose={() => onItemClicked(option.value)}
                    />
                  );
                })}
              </ul>
            ) : (
              <EmptyState />
            )}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.ScrollbarWithThumb />
      </ScrollArea>
    </div>
  );
};

ComboboxList.displayName = "Combobox.List";

type ComboboxItemProps = {
  marked: boolean;
  label: string;
  onChoose: () => void;
};

const ComboboxItem: FC<ComboboxItemProps> = (props) => {
  const { marked, label, onChoose } = props;

  const jss = useJss();
  const theme = useTheme();
  const stx = jss.hash({
    "--selectItem-markColor": theme.colors.gray["600"],
    "--selectItem-hover-bgColor": theme.colors.gray["000"],
    "--selectItem-px": "0.5rem",
  });

  return (
    <li className={classNames(styles.comboboxItem, stx)}>
      <button
        type="button"
        className={styles.comboboxItemButton}
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

const LoadingState: FC = () => {
  const jss = useJss();
  const theme = useTheme();
  const stx = jss.hash({
    "--loadingState-color": theme.colors.gray["600"],
  });

  return (
    <div className={classNames(styles.loadingState, stx)}>
      <div>Loading...</div>
    </div>
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
      <div>No options found</div>
    </div>
  );
};

export { ComboboxList };
