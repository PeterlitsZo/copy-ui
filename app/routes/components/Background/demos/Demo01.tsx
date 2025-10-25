import { Background } from "src/components/Background";
import { Paper } from "@/components/Paper";
import { lorem } from "./lorem";

export default function Demo() {
  const style = {
    width: "30rem",
    height: "15rem",
  };

  return (
    <Paper style={style} withBorder radius="md">
      <Background.Container style={{ padding: "1rem" }}>
        <Background kind="dots" />
        <div style={{ position: "relative" }}>{lorem}</div>
      </Background.Container>
    </Paper>
  );
}
