import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
} from "react";
import type { StoreApi } from "zustand";

import { buildToastStore, type ToastStore } from "./toast-store";

const InternalToastContext = createContext<StoreApi<ToastStore> | null>(null);

const ToastContext: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const store = buildToastStore();

  return <InternalToastContext value={store}>{children}</InternalToastContext>;
};

ToastContext.displayName = "Toast.Context";

const useToastStore = () => {
  const ctx = useContext(InternalToastContext);
  if (!ctx) {
    throw new Error("useToastContext must be used within a Toast.Context");
  }
  return ctx;
};

export { ToastContext, useToastStore };
