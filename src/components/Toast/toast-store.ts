import { uniqueId } from "es-toolkit/compat";
import { createStore } from "zustand";

type Toast = {
  id: string;
  content: string;
  timeoutHandler: ReturnType<typeof setTimeout> | null;
};

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
        }));
      }, 4000);

      const id = uniqueId("toast-");
      const toast = {
        id,
        content: message,
        timeoutHandler,
      };

      set((state) => ({
        toasts: [...state.toasts, toast],
      }));
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
      }));
    },
    unhoverToast: (id) => {
      set((state) => ({
        toasts: state.toasts.map((t) => {
          if (t.id === id && !t.timeoutHandler) {
            const timeoutHandler = setTimeout(() => {
              set((state) => ({
                toasts: state.toasts.filter((toast) => toast.id !== id),
              }));
            }, 6000);
            return { ...t, timeoutHandler };
          }
          return t;
        }),
      }));
    },
  }));
}

export { buildToastStore, type ToastStore };
