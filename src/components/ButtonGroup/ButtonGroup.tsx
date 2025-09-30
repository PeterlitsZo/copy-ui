import type { FC } from "react";

import styles from "./ButtonGroup.module.scss";
import classNames from "classnames";

export type ButtonGroupProps = {
  className?: string;
  children: React.ReactNode;
};

export const ButtonGroup: FC<ButtonGroupProps> = (props) => {
  const { className, children } = props;

  return (
    <div className={classNames(styles.buttonGroup, className)}>
      {children}
    </div>
  );
}
