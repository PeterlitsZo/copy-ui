import { useState } from "react";
import { Background } from "@/components/Background";
import { useJss } from "@/components/CopyUiProvider/use-jss";
import { Flex } from "@/components/Flex";
import { Paper } from "@/components/Paper";
import { Select } from "@/components/Select";
import { lorem } from "./lorem";

export default function Demo() {
  const [bgKind, setBgKind] = useState<"lines" | "dots" | "chessboard">("dots");

  const jss = useJss();

  const stx = jss.hash({
    width: "30rem",
    height: "15rem",
  });

  const selectOpts = [
    { value: "lines", label: "Lines" },
    { value: "dots", label: "Dots" },
    { value: "chessboard", label: "Chessboard" },
  ] as { value: "lines" | "dots" | "chessboard"; label: string }[];

  return (
    <Flex dir="column" gap="1rem">
      <Paper className={stx} withBorder radius="md">
        <Background.Container style={{ padding: "1rem" }}>
          <Background kind={bgKind} />
          <div style={{ position: "relative" }}>{lorem}</div>
        </Background.Container>
      </Paper>
      <Select options={selectOpts} onChange={setBgKind} value={bgKind} />
    </Flex>
  );
}
