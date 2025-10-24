import { useContext } from "react";

import { CopyUiContext } from "./copy-ui-provider";

const useJss = () => {
  const copyUiContext = useContext(CopyUiContext);
  if (!copyUiContext) {
    throw new Error("useJss must be used within a CopyUiProvider");
  }
  return copyUiContext.getState().jssState;
};

export { useJss };
