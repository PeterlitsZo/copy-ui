import { createContext, type FC, useEffect, useRef } from "react";
import { createStore, type StoreApi } from "zustand";

import { Toast } from "@/components/Toast";
import { createJssState, type JssState } from "@/utils/jss";
import { DEFAULT_THEME } from "./default-theme";
import type { Theme } from "./theme";
import { useJss } from "./use-jss";

type CopyUiStoreState = {
  jssState: JssState;
  theme: Theme;
};

type CopyUiStore = CopyUiStoreState;

const CopyUiContext = createContext<StoreApi<CopyUiStore> | null>(null);

type CopyUiProviderProps = {
  children?: React.ReactNode;
};

const CopyUiProvider: FC<CopyUiProviderProps> = (props) => {
  const { children } = props;

  const storeRef = useRef<StoreApi<CopyUiStore> | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createStore<CopyUiStore>()(() => ({
      jssState: createJssState(),
      theme: DEFAULT_THEME,
    }));
  }

  return (
    <CopyUiContext.Provider value={storeRef.current}>
      <Toast.Context>
        {children}
        <Toast.Container />
      </Toast.Context>
      <JssSsrCss />
    </CopyUiContext.Provider>
  );
};

const JssSsrCss = () => {
  const jss = useJss();
  const css = jss.extractSsrCss();
  const jssSsrId = "copy-ui-jss-ssr";

  useEffect(() => {
    // Remove the style tag after hydration.
    const styleEl = document.getElementById(jssSsrId);
    if (styleEl) {
      styleEl.innerHTML = "";
    }
  }, []);

  return (
    <style id={jssSsrId} suppressHydrationWarning={true}>
      {css}
    </style>
  );
};

CopyUiProvider.displayName = "CopyUiProvider";

export { CopyUiContext, CopyUiProvider };
