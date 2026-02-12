import classNames from "classnames";
import { ChevronsUpDown } from "lucide-react";
import {
  type ComponentProps,
  createContext,
  type FC,
  type Ref,
  useContext,
} from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { extractStylesProps, IbsBase } from "@/components/IbsBase";

import styles from "./multi-select-trigger.module.css";

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

  const ibsBaseProps = useContext(TriggerIbsBasePropsContext);

  const { stx: baseStyleStx } = extractStylesProps(ibsBaseProps ?? {});

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
    "--multiSelectTrigger-bdColor": theme.colors.gray["400"],
    "--multiSelectTrigger-bdRadius": "0.5rem",
    "--multiSelectTrigger-placeholderColor": theme.colors.gray["600"],
    "--multiSelectTrigger-pl": "var(--multiSelect-triggerPl)",
    "--multiSelectTrigger-iconColor": theme.colors.gray["600"],

    "--multiSelectTrigger-disabled-color": theme.colors.gray["600"],
    "--multiSelectTrigger-disabled-bgColor": theme.colors.gray["000"],
    "--multiSelectTrigger-disabled-bdColor": theme.colors.gray["200"],

    "--multiSelectTrigger-focus-bdColor": theme.colors.blue["700"],
  });

  return (
    <IbsBase
      id={id}
      ref={ref}
      className={classNames(
        styles.selectTrigger,
        triggerStx,
        baseStyleStx,
        className,
      )}
      onClick={() => !disabled && onToggle()}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen ? "true" : "false"}
      data-value-picked={showLabels == null ? undefined : "true"}
      data-disabled={disabled ? "true" : undefined}
      data-opened={isOpen ? "true" : undefined}
    >
      <IbsBase.Wrapper>
        <span className={styles.selectLabelsContainer}>
          {showLabels !== null
            ? showLabels.map((l) => <MultiSelectLabel key={l} label={l} />)
            : placeholder}
        </span>
      </IbsBase.Wrapper>
      <IbsBase.RightSection className={styles.selectIcon}>
        <ChevronsUpDown size="50%" />
      </IbsBase.RightSection>
    </IbsBase>
  );
};

MultiSelectTrigger.displayName = "MultiSelect.Trigger";

const MultiSelectLabel = ({ label }: { label: string }) => {
  const theme = useTheme();
  const jss = useJss();

  const labelStx = jss.hash({
    "--multiSelectTrigger-labelP": "0.125rem 0.375rem",
    "--multiSelectTrigger-labelBgColor": theme.colors.gray["100"],
  });

  return (
    <span className={classNames(styles.selectLabel, labelStx)}>{label}</span>
  );
};

const TriggerIbsBasePropsContext = createContext<ComponentProps<
  typeof IbsBase
> | null>(null);

export { MultiSelectTrigger, TriggerIbsBasePropsContext };
