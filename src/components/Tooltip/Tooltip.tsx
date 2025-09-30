import type { FC, ReactNode } from "react";

import { Popover, type Placement } from "../Popover";
import { useTheme } from "../ThemeProvider";

import styles from './Tooltip.module.scss';

interface TooltipTriggerRenderProps {
  setRef: (el: Element | null) => void;

  onOpen: () => void;
  onClose: () => void;
}

interface TooltipProps {
  label: string;
  placement?: Placement;
  triggerRender: (props: TooltipTriggerRenderProps) => ReactNode;
}

export const Tooltip: FC<TooltipProps> = (props) => {
  const { label, placement = 'top', triggerRender } = props;

  const theme = useTheme();

  const computedStyle = {
    '--tooltip-background-color': theme.colors.gray['900'],
    '--tooltip-color': theme.colors.gray['100'],
  }

  return (
    <Popover placement={placement}>
      <Popover.Trigger render={triggerRender} />
      <Popover.Portal
        onClickOutside={({ closePortal }) => closePortal()}
        render={({ setRef, isOpen, floatingStyles }) => (
          isOpen && (
            <div
              ref={setRef}
              className={styles.tooltip}
              style={{ ...computedStyle, ...floatingStyles }}
            >
              {label}
            </div>
          )
        )}
      />
    </Popover>
  );
};

Tooltip.displayName = "Tooltip";
