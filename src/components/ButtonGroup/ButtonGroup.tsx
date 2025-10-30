import classNames from "classnames";
import type { FC } from "react";

import styles from "./ButtonGroup.module.scss";

export type ButtonGroupProps = {
  className?: string;
  children: React.ReactNode;
};

export const ButtonGroup: FC<ButtonGroupProps> = (props) => {
  const { className, children } = props;

  return (
    <div
      data-component="button-group"
      className={classNames(styles.buttonGroup, className)}
    >
      {children}
    </div>
  );
};
