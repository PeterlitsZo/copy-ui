import type { ComponentProps, FC } from "react";

import { ScrollArea } from "@/components/ScrollArea";

import styles from "./card-content-in-scroll-area.module.scss";

type CardContentInScrollAreaProps = ComponentProps<"div">;

const CardContentInScrollArea: FC<CardContentInScrollAreaProps> = (props) => {
  const { children, className, style, ...rest } = props;

  return (
    <ScrollArea
      data-component="card-content-in-scroll-area"
      className={styles.cardContentInScrollArea}
      {...rest}
    >
      <ScrollArea.Viewport className={className} style={style}>
        <ScrollArea.Content className={styles.cardContentInScrollAreaContent}>
          {children}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.ScrollbarWithThumb />
    </ScrollArea>
  );
};

CardContentInScrollArea.displayName = "Card.ContentInScrollArea";

export { CardContentInScrollArea };
