import { Background } from "src/components/Background";

import { lorem } from "./lorem";

export function Demo() {
  const style = {
    width: "30rem",
    height: "15rem",
    padding: "1rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
  };
  return (
    <div style={style}>
      <Background kind="lines" />
      <div style={{ position: "relative" }}>{lorem}</div>
    </div>
  );
}
