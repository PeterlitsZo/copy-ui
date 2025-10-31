import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./card-header.module.scss";

type CardHeaderProps = ComponentProps<"div">;

const CardHeader: FC<CardHeaderProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={classNames(styles.cardHeader, className)} {...rest}>
      {children}
    </div>
  );
};

CardHeader.displayName = "Card.Header";

export { CardHeader };
