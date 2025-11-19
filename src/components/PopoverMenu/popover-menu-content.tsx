import classNames from "classnames";
import type { CSSProperties, FC, Ref } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { ScrollArea } from "@/components/ScrollArea";

import styles from "./popover-menu-content.module.scss";

type PopoverMenuContentProps = {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  style: CSSProperties;
  children: React.ReactNode;
};

const PopoverMenuContent: FC<PopoverMenuContentProps> = (props) => {
  const { ref, className, style, children } = props;

  const theme = useTheme();
  const jss = useJss();

  const contentStx = jss.hash({
    "--popover-menu-font-size": theme.tokens.inputBaseMdFontSize,
    "--popover-menu-line-height": theme.tokens.inputBaseMdLineHeight,

    "--popover-menu-border-color": theme.tokens.inputBaseDefaultBorderColor,
    "--popover-menu-border-radius": theme.tokens.inputBaseBorderRadius,
  });

  const viewStx = jss.hash({
    maxHeight: "15rem",
  });

  return (
    <ScrollArea
      ref={ref}
      style={style}
      className={classNames(styles.popoverMenuContent, contentStx, className)}
    >
      <ScrollArea.Viewport className={viewStx}>
        <ScrollArea.Content>
          <ul className={styles.popoverMenuList}>{children}</ul>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.ScrollbarWithThumb />
    </ScrollArea>
  );
};

PopoverMenuContent.displayName = "PopoverMenu.Content";

export { PopoverMenuContent };
