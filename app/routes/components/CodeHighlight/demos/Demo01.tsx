import { CodeHighlight } from "src/components/CodeHighlight/CodeHighlight";
import { useTheme } from "src/components/ThemeProvider";
import { Flex } from "@/components/Flex";

const code = `\
/**
 * Return the string 'foobar'.
 */
function foobar() {
  return 'foobar';
}
`;

export default function Demo() {
  const theme = useTheme();

  const style = {
    backgroundColor: theme.colors.gray["000"],
    padding: "1rem",
    borderRadius: "0.5rem",
    width: "40rem",
  };

  return (
    <Flex style={style}>
      <CodeHighlight code={code} lang="typescript" withLineNumbers />
    </Flex>
  );
}
