import classNames from "classnames";
import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { type FC, useMemo } from "react";
import { useStore } from "zustand";
import { useJss, useTheme } from "@/components/CopyUiProvider";
import { Modal } from "@/components/Modal";
import styles from "./toast.module.scss";
import { ToastContext, useToastStore } from "./toast-context";
import type { Toast as TypeToast } from "./toast-store";

const ToastContainer: FC = () => {
  const jss = useJss();

  const store = useToastStore();

  const toasts = useStore(store, (state) => state.toasts);

  const stx = jss.hash({
    "--toast-boxShadow": "0 2px 4px rgba(0, 0, 0, 0.05)",
  });

  return (
    <Modal.Raw>
      <section className={classNames(styles.toastContainer, stx)}>
        <ul className={styles.toastList}>
          {toasts.map((toast) => (
            <ToastInternal key={toast.id} toast={toast} />
          ))}
        </ul>
      </section>
    </Modal.Raw>
  );
};

ToastContainer.displayName = "Toast.Container";

type ToastInternalProps = {
  toast: TypeToast;
};

const ToastInternal: FC<ToastInternalProps> = ({ toast }) => {
  const jss = useJss();
  const theme = useTheme();
  const store = useToastStore();

  const icon = useMemo(() => {
    switch (toast.content.type) {
      case "success":
        return <CircleCheckIcon />;
      case "info":
        return <InfoIcon />;
      case "warning":
        return <TriangleAlertIcon />;
      case "error":
        return <OctagonXIcon />;
    }
    return null;
  }, [toast.content.type]);

  const color = useMemo(() => {
    switch (toast.content.type) {
      case "success":
        return "green";
      case "info":
        return "gray";
      case "warning":
        return "yellow";
      case "error":
        return "red";
    }
    return "gray";
  }, [toast.content.type]);
  const stx = jss.hash({
    "--toast-bgColor": color === "gray" ? "white" : theme.colors[color]["050"],
    "--toast-bdColor": theme.colors[color]["400"],
    "--toast-iconColor": theme.colors[color]["650"],
    "--toast-titleColor": theme.colors[color]["650"],
    "--toast-descriptionColor": `color-mix(in oklch, ${theme.colors[color]["600"]}, ${theme.colors.gray["600"]} 50%)`,
  });

  return (
    <li
      className={classNames(styles.toast, icon != null && styles.withIcon, stx)}
      onMouseEnter={() => store.getState().hoverToast?.(toast.id)}
      onMouseLeave={() => store.getState().unhoverToast?.(toast.id)}
    >
      {icon != null && <div className={styles.toastIcon}>{icon}</div>}
      <div className={styles.toastMessage}>
        <div className={styles.toastMessageTitle}>{toast.content.message}</div>
        {toast.content.description != null && (
          <div className={styles.toastMessageDescription}>
            {toast.content.description}
          </div>
        )}
      </div>
    </li>
  );
};

type ToastComponent = {
  Container: typeof ToastContainer;
  Context: typeof ToastContext;
};

export const Toast: ToastComponent = () => {};

Toast.Container = ToastContainer;
Toast.Context = ToastContext;
