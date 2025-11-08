import { createContext, useContext } from "react";

type FieldContextState = {
  id: string;
};

const FieldContext = createContext<FieldContextState | null>(null);

function useFieldContext() {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("useFieldContext must be used within a Field component");
  }
  return context;
}

export type { FieldContextState };
export { FieldContext, useFieldContext };
