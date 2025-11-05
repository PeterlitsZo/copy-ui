import { Background } from "@/components/Background";
import { useJss } from "@/components/CopyUiProvider";
import { Paper } from "@/components/Paper";
import { lorem } from "./lorem";

export default function Demo() {
  const jss = useJss();

  const stx = jss.hash({
    width: "30rem",
    height: "15rem",
  });

  return (
    <Paper className={stx} withBorder radius="md">
      <Background.Container style={{ padding: "1rem" }}>
        <Background kind="dots" />
        <div style={{ position: "relative" }}>{lorem}</div>
      </Background.Container>
    </Paper>
  );
}
