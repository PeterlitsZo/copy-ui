import { type ComponentProps, type FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { getModalRoot } from "./get-modal-root";

type ModalRawProps = ComponentProps<"div"> & {
  isOpen?: boolean;
};

const ModalRaw: FC<ModalRawProps> = (props) => {
  const { isOpen = true, children, ...rest } = props;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isOpen) return null;
  if (!isClient) return null;

  return createPortal(<div {...rest}>{children}</div>, getModalRoot());
};

ModalRaw.displayName = "Modal.Raw";

export { ModalRaw };
