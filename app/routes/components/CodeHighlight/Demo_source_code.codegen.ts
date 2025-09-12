export const demoSourceCode = ''
  + 'import { useContext } from "react";\n'
  + 'import { CodeHighlight } from "src/components/CodeHighlight/CodeHighlight";\n'
  + 'import { ThemeContext } from "src/components/ThemeProvider";\n'
  + '\n'
  + 'const code = `\\\n'
  + '/**\n'
  + " * Return the string 'foobar'.\n"
  + ' */\n'
  + 'function foobar() {\n'
  + "  return 'foobar';\n"
  + '}\n'
  + '`;\n'
  + '\n'
  + 'export function Demo() {\n'
  + '  const theme = useContext(ThemeContext);\n'
  + '\n'
  + '  return (\n'
  + "    <div style={{ backgroundColor: theme.colors.gray['000'], padding: '1rem', borderRadius: '0.5rem', width: '40rem' }}>\n"
  + '      <CodeHighlight code={code} lang="typescript" />\n'
  + '    </div>\n'
  + '  )\n'
  + '}\n'
  ;
