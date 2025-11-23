import tinycolor from "tinycolor2";
import { Background } from "@/components/Background";
import { useJss, useMode, useTheme } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { Paper } from "@/components/Paper";

export default function Demo() {
  const jss = useJss();
  const mode = useMode();
  const theme = useTheme();

  const stx = jss.hash({
    width: "30rem",
    height: "6rem",
  });

  const color =
    mode === "dark" ? theme.colors.violet["200"] : theme.colors.violet["800"];

  return (
    <Flex dir="column" gap="1rem">
      <Paper className={stx} withBorder radius="md">
        <Background.Container>
          <Background
            kind="dots"
            config={{ dotColor: tinycolor(color).setAlpha(0.3).toHex8String() }}
          />
        </Background.Container>
      </Paper>
      <Paper className={stx} withBorder radius="md">
        <Background.Container>
          <Background
            kind="lines"
            config={{
              lineColor: tinycolor(color).setAlpha(0.2).toHex8String(),
            }}
          />
        </Background.Container>
      </Paper>
      <Paper className={stx} withBorder radius="md">
        <Background.Container>
          <Background
            kind="chessboard"
            config={{
              chessboardColor: tinycolor(color).setAlpha(0.15).toHex8String(),
            }}
          />
        </Background.Container>
      </Paper>
    </Flex>
  );
}
