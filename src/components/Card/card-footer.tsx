import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./card-footer.module.scss";

type CardFooterProps = ComponentProps<"div">;

const CardFooter: FC<CardFooterProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={classNames(styles.cardFooter, className)} {...rest}>
      {children}
    </div>
  );
};

CardFooter.displayName = "Card.Footer";

export { CardFooter };
