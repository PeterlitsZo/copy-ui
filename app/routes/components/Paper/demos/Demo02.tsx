import { useTheme } from "@/components/CopyUiProvider";
import { Paper } from "@/components/Paper";

export default function Demo() {
  const theme = useTheme();

  return (
    <Paper style={{ backgroundColor: theme.colors.blue["000"] }}>
      <div>This is a raw Paper component.</div>
      <div>Without border.</div>
      <div>Without padding.</div>
      <div>And without shadow.</div>
      <div>Only has a background color.</div>
    </Paper>
  );
}
