import { ScrollArea } from "@/components/ScrollArea";
import { useTheme } from "@/components/ThemeProvider";

import { lorem } from "./lorem";

export default function Demo() {
  const theme = useTheme();

  const scrollAreaStyle = {
    width: "30rem",
    height: "20rem",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    border: `1px solid ${theme.colors.gray["300"]}`,
  };

  const saContentStyle = {
    padding: "1rem",
    lineHeight: 1.6,
  };

  return (
    <ScrollArea style={scrollAreaStyle}>
      <ScrollArea.Viewport>
        <ScrollArea.Content style={saContentStyle}>
          <p>{lorem}</p>
          <p>{lorem}</p>
          <p>{lorem}</p>
          <p>{lorem}</p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea>
  );
}
