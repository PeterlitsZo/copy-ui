import classNames from "classnames";
import type { CSSProperties, FC } from "react";
import tinycolor from "tinycolor2";

import { useJss, useTheme } from "@/components/CopyUiProvider";

import { ModalContent } from "./modal-content";
import { ModalOverlay } from "./modal-overlay";
import { ModalRaw } from "./modal-raw";

type ModalProps = {
  isOpen?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

type ModalComponent = FC<ModalProps> & {
  Overlay: typeof ModalOverlay;
  Content: typeof ModalContent;
  Raw: typeof ModalRaw;
};

const Modal: ModalComponent = (props: ModalProps) => {
  const { isOpen, style, className, children } = props;

  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    "--modal-overlay-bg": tinycolor(theme.colors.gray["900"])
      .setAlpha(0.4)
      .toHex8String(),
    "--modal-content-shadow": theme.shadow.md,
  });

  return (
    <Modal.Raw
      isOpen={isOpen}
      className={classNames(stx, className)}
      style={style}
    >
      {children}
    </Modal.Raw>
  );
};

Modal.displayName = "Modal";

Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Raw = ModalRaw;

export { Modal };
