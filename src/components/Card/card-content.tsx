import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./card-content.module.scss";

type CardContentProps = ComponentProps<"div">;

const CardContent: FC<CardContentProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={classNames(styles.cardContent, className)}
      data-component="card-content"
      {...rest}
    >
      {children}
    </div>
  );
};

CardContent.displayName = "Card.Content";

export { CardContent };
