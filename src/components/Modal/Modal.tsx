import classNames from "classnames";
import type { ComponentProps, FC } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

// Modal.Overlay
// =============================================================================

type ModalOverlayProps = ComponentProps<"div">;

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div className={classNames(styles.modalOverlay, className)} {...rest} />
  );
};

// Modal.Content
// =============================================================================

type ModalContentProps = ComponentProps<"div">;

const ModalContent: FC<ModalContentProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div className={classNames(styles.modalContent, className)} {...rest} />
  );
};

// Modal
// =============================================================================

type ModalProps = {
  isOpen?: boolean;
  children?: React.ReactNode;
};

type ModalComponent = FC<ModalProps> & {
  Overlay: typeof ModalOverlay;
  Content: typeof ModalContent;
};

const Modal: ModalComponent = (props: ModalProps) => {
  const { isOpen = true, children } = props;

  if (!isOpen) return null;

  return createPortal(<div>{children}</div>, getModalRoot());
};

Modal.displayName = "Modal";

Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;

// getModalRoot
// =============================================================================

function getModalRoot() {
  let modalRoot = document.getElementById("copy-ui-modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "copy-ui-modal-root";
    document.body.appendChild(modalRoot);
  }
  return modalRoot;
}

// Export
// =============================================================================

export { Modal };
