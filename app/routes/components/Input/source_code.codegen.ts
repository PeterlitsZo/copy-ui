export const sourceCode: Record<string, string> = {};

sourceCode['index.ts'] = ''
  + '// Input from copy-ui @ 2025-09-11\n'
  + '\n'
  + "export { Input } from './Input';\n"
  + "export type { InputProps } from './Input';\n"
  ;

sourceCode['Input.tsx'] = ''
  + 'import classNames from "classnames";\n'
  + 'import { useContext, type ComponentProps, type FC } from "react";\n'
  + '\n'
  + 'import { ThemeContext } from "../ThemeProvider";\n'
  + '\n'
  + 'import styles from "./Input.module.scss";\n'
  + '\n'
  + "export type InputProps = ComponentProps<'input'>;\n"
  + '\n'
  + 'export const Input: FC<InputProps> = (props) => {\n'
  + '  const theme = useContext(ThemeContext);\n'
  + '\n'
  + '  const { className, style, ...rest } = props;\n'
  + '\n'
  + '  const computedStyle = {\n'
  + "    '--input-border-color': theme.colors.gray['200'],\n"
  + "    '--input-border-color-focus': theme.colors.blue['800'],\n"
  + "    '--input-border-radius': '0.375rem',\n"
  + '    ...style,\n'
  + '  } as React.CSSProperties;\n'
  + '\n'
  + '  return (\n'
  + '    <input\n'
  + '      className={classNames(className, styles.input)}\n'
  + '      style={computedStyle}\n'
  + '      {...rest}\n'
  + '    />\n'
  + '  );\n'
  + '}\n'
  ;

sourceCode['Input.module.scss'] = ''
  + '.input {\n'
  + '  height: 2.25rem;\n'
  + '  min-width: 16rem;\n'
  + '  padding-inline: 0.5rem;\n'
  + '  border-width: 1px;\n'
  + '  border-style: solid;\n'
  + '  border-color: var(--input-border-color);;\n'
  + '  border-radius: var(--input-border-radius);\n'
  + '  font-size: 1.125rem;\n'
  + '  line-height: 1.5rem;\n'
  + '\n'
  + '  &:focus {\n'
  + '    outline: none;\n'
  + '    border-color: var(--input-border-color-focus);\n'
  + '  }\n'
  + '}\n'
  ;

