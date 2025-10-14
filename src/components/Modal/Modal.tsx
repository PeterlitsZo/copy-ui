import classNames from "classnames";
import type { ComponentProps, CSSProperties, FC } from "react";
import { createPortal } from "react-dom";
import tinycolor from "tinycolor2";
import { useTheme } from "../ThemeProvider";
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

// Modal
// =============================================================================

type ModalProps = {
  isOpen?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

type ModalComponent = FC<ModalProps> & {
  Overlay: typeof ModalOverlay;
  Content: typeof ModalContent;
};

const Modal: ModalComponent = (props: ModalProps) => {
  const { isOpen = true, style, className, children } = props;

  const theme = useTheme();

  const computedStyle = {
    "--modal-overlay-bg": tinycolor(theme.colors.gray["900"])
      .setAlpha(0.4)
      .toHex8String(),
    "--modal-content-shadow": theme.shadow.md,
    ...style,
  } as CSSProperties;

  if (!isOpen) return null;

  return createPortal(
    <div style={computedStyle} className={className}>
      {children}
    </div>,
    getModalRoot(),
  );
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
