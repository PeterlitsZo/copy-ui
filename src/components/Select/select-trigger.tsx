import classNames from "classnames";
import { ChevronsUpDown } from "lucide-react";
import type { FC, Ref } from "react";

import { useJss } from "@/components/CopyUiProvider";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./select-trigger.module.scss";

type SelectTriggerProps = {
  id?: string;
  ref: Ref<HTMLButtonElement>;
  className?: string;

  placeholder: string;
  disabled: boolean;
  isOpen: boolean;
  showLabel: string | null;

  onToggle: () => void;
};

const SelectTrigger: FC<SelectTriggerProps> = (props) => {
  const {
    id,
    ref,
    className,
    placeholder,
    disabled,
    isOpen,
    showLabel,
    onToggle,
  } = props;

  const theme = useTheme();
  const jss = useJss();

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
    <button
      id={id}
      ref={ref}
      className={classNames(styles.selectTrigger, triggerStx, className)}
      onClick={() => !disabled && onToggle()}
      data-value-picked={showLabel == null ? undefined : "true"}
      data-disabled={disabled ? "true" : undefined}
      data-opened={isOpen ? "true" : undefined}
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded="false"
    >
      <span style={{ flex: 1 }}>
        {showLabel !== null ? showLabel : placeholder}
      </span>
      <span className={styles.selectIcon}>
        <ChevronsUpDown size="62.5%" />
      </span>
    </button>
  );
};

SelectTrigger.displayName = "Select.Trigger";

export { SelectTrigger };
