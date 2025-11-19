import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import styles from "./popover-menu-item.module.scss";

export type PopoverMenuItemProps = ComponentProps<"button"> & {
  children: React.ReactNode;
};

const PopoverMenuItem: FC<PopoverMenuItemProps> = (props) => {
  const { className, children, disabled, onClick, ...rest } = props;

  const theme = useTheme();
  const jss = useJss();

  const itemStx = jss.hash({
    "--popover-menu-item-hover-bg-color": theme.colors.gray["000"],
    "--popover-menu-item-disabled-color": theme.colors.gray["500"],
  });

  return (
    <li className={classNames(styles.popoverMenuItem, itemStx)}>
      <button
        type="button"
        className={classNames(styles.popoverMenuItemButton, className)}
        disabled={disabled}
        data-disabled={disabled ? "true" : undefined}
        onClick={(e) => {
          if (!disabled && onClick) {
            onClick(e);
          }
        }}
        tabIndex={disabled ? -1 : 0}
        {...rest}
      >
        <span className={styles.popoverMenuItemContent}>{children}</span>
      </button>
    </li>
  );
};

PopoverMenuItem.displayName = "PopoverMenu.Item";

export { PopoverMenuItem };
