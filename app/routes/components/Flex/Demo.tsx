import { Flex } from "@/components/Flex";
import { useTheme } from "@/components/ThemeProvider";

export function Demo() {
  const theme = useTheme();

  const boxStyle = {
    width: "10rem",
    height: "5rem",
    backgroundColor: theme.colors.red["000"],
    border: `1px solid ${theme.colors.red["300"]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.red["700"],
  };

  return (
    <Flex dir="row" gap="1rem">
      <div style={boxStyle}>1</div>
      <div style={boxStyle}>2</div>
      <div style={boxStyle}>3</div>
    </Flex>
  );
}
