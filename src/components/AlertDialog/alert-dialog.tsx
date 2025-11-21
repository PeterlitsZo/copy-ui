import classNames from "classnames";
import type { FC } from "react";

import { Card } from "@/components/Card";
import { Modal } from "@/components/Modal";

import styles from "./alert-dialog.module.scss";
import { AlertDialogAction } from "./alert-dialog-action";
import { AlertDialogCancel } from "./alert-dialog-cancel";
import { AlertDialogContent } from "./alert-dialog-content";
import { AlertDialogFooter } from "./alert-dialog-footer";
import { AlertDialogHeader } from "./alert-dialog-header";

type AlertDialogProps = {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
};

type AlertDialogComponent = FC<AlertDialogProps> & {
  Header: typeof AlertDialogHeader;
  Content: typeof AlertDialogContent;
  Footer: typeof AlertDialogFooter;
  Cancel: typeof AlertDialogCancel;
  Action: typeof AlertDialogAction;
};

const AlertDialog: AlertDialogComponent = (props: AlertDialogProps) => {
  const { isOpen = false, onClose, className, children } = props;

  const handleOverlayClick = () => {
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay onClick={handleOverlayClick} />
      <Modal.Content center shadow>
        <Card className={classNames(styles.alertDialog, className)}>
          {children}
        </Card>
      </Modal.Content>
    </Modal>
  );
};

AlertDialog.displayName = "AlertDialog";

AlertDialog.Header = AlertDialogHeader;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Footer = AlertDialogFooter;
AlertDialog.Cancel = AlertDialogCancel;
AlertDialog.Action = AlertDialogAction;

export type { AlertDialogProps };
export { AlertDialog };
