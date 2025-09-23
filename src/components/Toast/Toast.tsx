import { createContext, useContext, type FC, type PropsWithChildren } from "react";
import { useStore } from "zustand";
import { createStore, type StoreApi } from "zustand";

import styles from './Toast.module.scss';
import { useTheme } from "../ThemeProvider";
import { uniqueId } from "es-toolkit/compat";

// Types
// =============================================================================

type Toast = {
  id: string;
  content: string;
  timeoutHandler: ReturnType<typeof setTimeout> | null;
}

// ToastStore
// =============================================================================

type ToastStoreState = {
  toasts: Array<Toast>;
};

type ToastStoreActions = {
  addToast: (message: string) => void;
  hoverToast?: (id: string) => void;
  unhoverToast?: (id: string) => void;
};

type ToastStore = ToastStoreState & ToastStoreActions;

function buildToastStore() {
  return createStore<ToastStore>()((set) => ({
    toasts: [],
    
    addToast: (message) => {
      const timeoutHandler = setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== toast.id),
        }))
      }, 4000);

      const id = uniqueId('toast-');
      const toast = {
        id,
        content: message,
        timeoutHandler,
      };

      set((state) => ({
        toasts: [...state.toasts, toast],
      }))
    },
    hoverToast: (id) => {
      set((state) => ({
        toasts: state.toasts.map((t) => {
          if (t.id === id && t.timeoutHandler) {
            clearTimeout(t.timeoutHandler);
            return { ...t, timeoutHandler: null };
          }
          return t;
        }),
      }))
    },
    unhoverToast: (id) => {
      set((state) => ({
        toasts: state.toasts.map((t) => {
          if (t.id === id && !t.timeoutHandler) {
            const timeoutHandler = setTimeout(() => {
              set((state) => ({
                toasts: state.toasts.filter((toast) => toast.id !== id),
              }))
            }, 6000);
            return { ...t, timeoutHandler };
          }
          return t;
        }),
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
    '--toast-box-shadow': '0 2px 4px rgba(0, 0, 0, 0.05)',
  } as React.CSSProperties;

  return (
    <section
      style={computedStyle}
      className={styles.toastContainer}
    >
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