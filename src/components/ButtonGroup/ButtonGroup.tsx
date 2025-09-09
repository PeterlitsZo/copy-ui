import type { FC, PropsWithChildren } from "react";

import styles from "./ButtonGroup.module.scss";

export type ButtonGroupProps = PropsWithChildren<{}>;

export const ButtonGroup: FC<ButtonGroupProps> = (props) => {
  return (
    <div className={styles.buttonGroup}>
      {props.children}
    </div>
  );
}