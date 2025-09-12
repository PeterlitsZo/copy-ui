import { useContext } from "react";
import { CodeHighlight } from "src/components/CodeHighlight/CodeHighlight";
import { ThemeContext } from "src/components/ThemeProvider";

const code = `\
/**
 * Return the string 'foobar'.
 */
function foobar() {
  return 'foobar';
}
`;

export function Demo() {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.colors.gray['000'], padding: '1rem', borderRadius: '0.5rem', width: '40rem' }}>
      <CodeHighlight code={code} lang="typescript" />
    </div>
  )
}