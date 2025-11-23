import { useMode, useTheme } from "@/components/CopyUiProvider";
import { Paper } from "@/components/Paper";

export default function Demo() {
  const mode = useMode();
  const theme = useTheme();

  const backgroundColor =
    mode === "dark" ? theme.colors.blue["800"] : theme.colors.blue["000"];

  return (
    <Paper style={{ backgroundColor }}>
      <div>This is a raw Paper component.</div>
      <div>Without border.</div>
      <div>Without padding.</div>
      <div>And without shadow.</div>
      <div>Only has a background color.</div>
    </Paper>
  );
}
