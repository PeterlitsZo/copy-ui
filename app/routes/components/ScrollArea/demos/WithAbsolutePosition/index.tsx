import { useTheme } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { ScrollArea } from "@/components/ScrollArea";

import { lorem } from "./lorem";

export default function Demo() {
  const theme = useTheme();

  const containerStyle = {
    width: "30rem",
    height: "20rem",
  };

  const scrollAreaStyle = {
    flex: 1,
    borderRadius: "0.5rem",
    backgroundColor: "white",
    border: `1px solid ${theme.colors.gray["300"]}`,
  };

  const saContentStyle = {
    padding: "1rem",
    lineHeight: 1.6,
  };

  return (
    <Flex dir="column" gap="1rem" style={containerStyle}>
      {[1, 2].map((key) => (
        <ScrollArea key={key} style={scrollAreaStyle} variant="absolute">
          <ScrollArea.Viewport>
            <ScrollArea.Content style={saContentStyle}>
              <p>{lorem}</p>
              <p>{lorem}</p>
              <p>{lorem}</p>
              <p>{lorem}</p>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.ScrollbarWithThumb />
        </ScrollArea>
      ))}
    </Flex>
  );
}
