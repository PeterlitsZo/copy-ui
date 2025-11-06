import classNames from "classnames";
import { ChevronsUpDown } from "lucide-react";
import type { FC, Ref } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./multi-select-trigger.module.scss";

type MultiSelectTriggerProps = {
  id?: string;
  ref: Ref<HTMLDivElement>;
  className?: string;

  placeholder: string;
  disabled: boolean;
  isOpen: boolean;
  showLabels: string[] | null;

  onToggle: () => void;
};

const MultiSelectTrigger: FC<MultiSelectTriggerProps> = (props) => {
  const {
    id,
    ref,
    className,
    placeholder,
    disabled,
    isOpen,
    showLabels,
    onToggle,
  } = props;

  const theme = useTheme();
  const jss = useJss();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  const triggerStx = jss.hash({
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

  return (
    <div
      id={id}
      ref={ref}
      className={classNames(styles.selectTrigger, triggerStx, className)}
      onClick={() => !disabled && onToggle()}
      data-value-picked={showLabels == null ? undefined : "true"}
      data-disabled={disabled ? "true" : undefined}
      data-opened={isOpen ? "true" : undefined}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded="false"
    >
      <span className={styles.selectLabelsContainer}>
        {showLabels !== null
          ? showLabels.map((l) => <MultiSelectLabel key={l} label={l} />)
          : placeholder}
      </span>
      <span className={styles.selectIcon}>
        <ChevronsUpDown size="62.5%" />
      </span>
    </div>
  );
};

MultiSelectTrigger.displayName = "MultiSelect.Trigger";

const MultiSelectLabel = ({ label }: { label: string }) => {
  const theme = useTheme();
  const jss = useJss();

  const labelStx = jss.hash({
    "--select-label-padding": "0.125rem 0.375rem",
    "--select-label-bg-color": theme.colors.gray["100"],
  });

  return (
    <span className={classNames(styles.selectLabel, labelStx)}>{label}</span>
  );
};

export { MultiSelectTrigger };
