import { CodeHighlight } from "@/components/CodeHighlight";
import { useTheme } from "@/components/ThemeProvider";

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
    borderRadius: "0.5rem",
    width: "40rem",
  };

  return (
    <CodeHighlight
      code={code}
      lang="typescript"
      withLineNumbers
      lineHighlight={{ ge: 4, lt: 7 }}
      style={style}
      px="1.5rem"
      py="0.75rem"
    />
  );
}
