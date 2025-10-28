import classNames from "classnames";
import type { FC } from "react";
import { useStore } from "zustand";

import { useJss } from "@/components/CopyUiProvider";
import { Modal } from "@/components/Modal";
import { useTheme } from "@/components/ThemeProvider";

import styles from "./toast.module.scss";
import { ToastContext, useToastStore } from "./toast-context";

const ToastContainer: FC = () => {
  const theme = useTheme();
  const jss = useJss();

  const store = useToastStore();

  const toasts = useStore(store, (state) => state.toasts);

  const stx = jss.hash({
    "--toast-bg-color": "white",
    "--toast-border-color": theme.colors.gray["300"],
    "--toast-box-shadow": "0 2px 4px rgba(0, 0, 0, 0.05)",
  });

  return (
    <Modal.Raw>
      <section className={classNames(styles.toastContainer, stx)}>
        <ul className={styles.toastList}>
          {toasts.map((toast) => (
            <li
              key={toast.id}
              className={styles.toast}
              onMouseEnter={() => store.getState().hoverToast?.(toast.id)}
              onMouseLeave={() => store.getState().unhoverToast?.(toast.id)}
            >
              {toast.content}
            </li>
          ))}
        </ul>
      </section>
    </Modal.Raw>
  );
};

ToastContainer.displayName = "Toast.Container";

export function useToast() {
  const store = useToastStore();

  return {
    addToast: store.getState().addToast,
  };
}

type ToastComponent = {
  Container: typeof ToastContainer;
  Context: typeof ToastContext;
};

export const Toast: ToastComponent = () => {};

Toast.Container = ToastContainer;
Toast.Context = ToastContext;
