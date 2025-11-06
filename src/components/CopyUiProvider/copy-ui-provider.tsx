import { createContext, type FC, useEffect, useRef, useState } from "react";
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
