import { createContext, useContext, type FC, type PropsWithChildren } from "react";
import { useStore } from "zustand";
import { createStore, type StoreApi } from "zustand";

import styles from './Toast.module.scss';
import { useTheme } from "../ThemeProvider";

// ToastStore
// =============================================================================

type ToastStoreState = {
  toasts: Array<string>;
};

type ToastStoreActions = {
  addToast: (message: string) => void;
};

type ToastStore = ToastStoreState & ToastStoreActions;

function buildToastStore() {
  return createStore<ToastStore>()((set) => ({
    toasts: [],
    
    addToast: (message) => {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.slice(1),
        }))
      }, 3000);

      set((state) => ({
        toasts: [...state.toasts, message],
      }))
    },
  }));
}

// ToastContext
// =============================================================================

const ToastContext = createContext<StoreApi<ToastStore> | null>(null);

const ToastContextWrapper: FC<PropsWithChildren> = ({ children }) => {
  const store = buildToastStore();

  return (
    <ToastContext value={store}>
      {children}
    </ToastContext>
  );
}

ToastContextWrapper.displayName = 'Toast.Context';

// ToastContainer
// =============================================================================

const ToastContainer: FC = () => {
  const theme = useTheme();

  const store = useContext(ToastContext);
  if (!store) {
    throw new Error('Toast.Container must be used within a Toast.Context');
  };

  const toasts = useStore(store, (state) => state.toasts);

  const computedStyle = {
    '--toast-bg-color': 'white',
    '--toast-border-color': theme.colors.gray['300'],
  } as React.CSSProperties;

  return (
    <section
      style={computedStyle}
      className={styles.toastContainer}
    >
      <ul className={styles.toastList}>
        {toasts.map((toast, index) => (
          <li key={index} className={styles.toast}>
            {toast}
          </li>
        ))}
      </ul>
    </section>
  );
};

ToastContainer.displayName = 'Toast.Container';

// useToast
// =============================================================================

export function useToast() {
  const store = useContext(ToastContext);
  if (!store) {
    throw new Error('useToast must be used within a Toast.Context');
  };

  return {
    addToast: store.getState().addToast,
  };
}

// Toast
// =============================================================================

type ToastComponent = {
  Container: typeof ToastContainer;
  Context: typeof ToastContextWrapper;
}

export const Toast: ToastComponent = () => {};

Toast.Container = ToastContainer;
Toast.Context = ToastContextWrapper;