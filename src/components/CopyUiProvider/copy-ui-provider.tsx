import { createContext, type FC, useEffect } from "react";
import { createStore, type StoreApi } from "zustand";
import { createJssState, type JssState } from "@/utils/jss";
import { useJss } from "./use-jss";

type CopyUiStoreState = {
  jssState: JssState;
};

type CopyUiStore = CopyUiStoreState;

const CopyUiContext = createContext<StoreApi<CopyUiStore> | null>(null);

type CopyUiProviderProps = {
  children?: React.ReactNode;
};

const CopyUiProvider: FC<CopyUiProviderProps> = (props) => {
  const { children } = props;

  const store = createStore<CopyUiStore>()(() => ({
    jssState: createJssState(),
  }));

  return (
    <CopyUiContext.Provider value={store}>
      {children}
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
