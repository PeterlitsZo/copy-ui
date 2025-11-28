import { uniqueId } from "es-toolkit/compat";
import { createStore } from "zustand";

type ToastType = "default" | "info" | "success" | "warning" | "error";

type Toast = {
  id: string;
  content: {
    type: ToastType;
    message: string;
    description?: string;
  };
  timeoutHandler: ReturnType<typeof setTimeout> | null;
};

type AddToastOpts =
  | {
      type?: ToastType;
      message: string;
      description?: string;
    }
  | string;

type ToastStoreState = {
  toasts: Array<Toast>;
};

type ToastStoreActions = {
  addToast: (opts: AddToastOpts) => void;
  hoverToast?: (id: string) => void;
  unhoverToast?: (id: string) => void;
};

type ToastStore = ToastStoreState & ToastStoreActions;

function buildToastStore() {
  return createStore<ToastStore>()((set) => ({
    toasts: [],

    addToast: (message) => {
      // The timeout handler to close the toast.
      const timeoutHandler = setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== toast.id),
        }));
      }, 4000);

      const id = uniqueId("toast-");
      const toastContent =
        typeof message === "string"
          ? {
              type: "default" as ToastType,
              message,
              description: undefined,
            }
          : {
              type: message.type ?? "default",
              message: message.message,
              description: message.description,
            };
      const toast = {
        id,
        content: toastContent,
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

export { buildToastStore, type Toast, type ToastStore };
