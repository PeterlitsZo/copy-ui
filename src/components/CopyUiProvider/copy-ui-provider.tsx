import { createContext, type FC, useEffect, useRef, useState } from "react";
import { createStore, type StoreApi } from "zustand";

import { Toast } from "@/components/Toast";
import { createJssState, type JssState } from "@/utils/jss";

import { DEFAULT_THEME } from "./default-theme";
import { MdxProvider } from "./mdx-provider";
import type { Theme } from "./theme";
import { useJss } from "./use-jss";

type CopyUiStoreState = {
  jssState: JssState;
  theme: Theme;
  mode: "light" | "dark";
};

type CopyUiStoreActions = {
  setMode: (
    mode: "light" | "dark" | ((prevMode: "light" | "dark") => "light" | "dark"),
  ) => void;
};

type CopyUiStore = CopyUiStoreState & CopyUiStoreActions;

const CopyUiContext = createContext<StoreApi<CopyUiStore> | null>(null);

type CopyUiProviderProps = {
  children?: React.ReactNode;
};

const CopyUiProvider: FC<CopyUiProviderProps> = (props) => {
  const { children } = props;

  const storeRef = useRef<StoreApi<CopyUiStore> | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createStore<CopyUiStore>()((set) => ({
      jssState: createJssState(),
      theme: DEFAULT_THEME,
      mode: "light",
      setMode: (mode) => {
        set((state) => ({
          mode: typeof mode === "function" ? mode(state.mode) : mode,
        }));
      },
    }));
  }

  return (
    <CopyUiContext.Provider value={storeRef.current}>
      <Toast.Context>
        <MdxProvider>{children}</MdxProvider>
        <Toast.Container />
      </Toast.Context>
      <JssSsrCss />
    </CopyUiContext.Provider>
  );
};

const JssSsrCss = () => {
  const jss = useJss();
  const css = jss.extractSsrCss();
  const [jssSsr, setJssSsr] = useState(true);

  useEffect(() => {
    // Remove the style tag after hydration.
    setJssSsr(false);
  }, []);

  if (!jssSsr) {
    return null;
  } else {
    return <style suppressHydrationWarning={true}>{css}</style>;
  }
};

CopyUiProvider.displayName = "CopyUiProvider";

export { CopyUiContext, CopyUiProvider };
