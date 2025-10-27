import classNames from "classnames";
import type { ComponentProps, FC } from "react";

import styles from "./modal-content.module.scss";

type ModalContentProps = ComponentProps<"div"> & {
  center?: boolean;
  shadow?: boolean;
};

const ModalContent: FC<ModalContentProps> = (props) => {
  const { className, center, shadow, ...rest } = props;

  return (
    <div
      className={classNames(styles.modalContent, className)}
      data-center={center}
      data-shadow={shadow}
      {...rest}
    />
  );
};

ModalContent.displayName = "Modal.Content";

export { ModalContent };
