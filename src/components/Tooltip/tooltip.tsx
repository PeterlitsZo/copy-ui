import classNames from "classnames";
import { type FC, type ReactNode, useMemo } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { type Placement, Popover } from "@/components/Popover";

import styles from "./tooltip.module.scss";

interface TooltipTriggerRenderProps {
  setRef: (el: Element | null) => void;

  onOpen: () => void;
  onClose: () => void;
}

interface TooltipProps {
  label: string;
  anchor?: "element" | "pointer";
  placement?: Placement;
  triggerRender: (props: TooltipTriggerRenderProps) => ReactNode;
}

export const Tooltip: FC<TooltipProps> = (props) => {
  const { label, anchor = "element", placement = "top", triggerRender } = props;

  const theme = useTheme();
  const jss = useJss();

  const computedStyle = jss.hash({
    "--tooltip-background-color": theme.colors.gray["900"],
    "--tooltip-color": theme.colors.gray["100"],
  });

  const offset = useMemo(() => {
    if (anchor === "pointer") {
      return 12;
    }
    return undefined;
  }, [anchor]);

  return (
    <Popover offset={offset} anchor={anchor} placement={placement}>
      <Popover.Trigger render={triggerRender} />
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, isOpen, floatingStyles }) =>
          isOpen && (
            <div
              ref={setRef}
              className={classNames(styles.tooltip, computedStyle)}
              style={floatingStyles}
            >
              {label}
            </div>
          )
        }
      />
    </Popover>
  );
};

Tooltip.displayName = "Tooltip";
