export const sourceCode: Record<string, string> = {};

sourceCode['index.ts'] = ''
  + '// Input from copy-ui @ 2025-09-22\n'
  + '\n'
  + "export { Input } from './Input';\n"
  + "export type { InputProps } from './Input';\n"
  ;

sourceCode['Input.tsx'] = ''
  + 'import classNames from "classnames";\n'
  + 'import { useContext, type ComponentProps, type CSSProperties, type FC } from "react";\n'
  + '\n'
  + 'import { ThemeContext } from "../ThemeProvider";\n'
  + '\n'
  + 'import styles from "./Input.module.scss";\n'
  + 'import { merge } from "es-toolkit";\n'
  + '\n'
  + "export type InputProps = Omit<ComponentProps<'input'>, 'size'> & {\n"
  + "  size?: 'sm' | 'md' | 'lg';\n"
  + '};\n'
  + '\n'
  + 'export const Input: FC<InputProps> = (props) => {\n'
  + '  const theme = useContext(ThemeContext);\n'
  + '\n'
  + "  const { size = 'md', className, style, ...rest } = props;\n"
  + '\n'
  + '  const computedStyle = mergeStyles([\n'
  + "    size === 'sm' && {\n"
  + "      '--input-height': '2rem',\n"
  + "      '--input-font-size': '0.875rem',\n"
  + '    } as CSSProperties,\n'
  + "    size === 'md' && {\n"
  + "      '--input-height': '2.25rem',\n"
  + "      '--input-font-size': '1rem',\n"
  + '    } as CSSProperties,\n'
  + "    size === 'lg' && {\n"
  + "      '--input-height': '2.5rem',\n"
  + "      '--input-font-size': '1.125rem',\n"
  + '    } as CSSProperties,\n'
  + '    {\n'
  + "      '--input-min-width': '16rem',\n"
  + "      '--input-padding-inline': '0.5rem',\n"
  + "      '--input-border-color': theme.colors.gray['200'],\n"
  + "      '--input-border-color-focus': theme.colors.blue['800'],\n"
  + "      '--input-border-radius': '0.375rem',\n"
  + "      '--input-line-height': '1.5rem',\n"
  + "      '--input-placeholder-color': theme.colors.gray['600'],\n"
  + "      '--input-caret-color': theme.colors.blue['600'],\n"
  + '    } as CSSProperties,\n'
  + '    style,\n'
  + '  ]);\n'
  + '\n'
  + '  return (\n'
  + '    <input\n'
  + '      className={classNames(className, styles.input)}\n'
  + '      style={computedStyle}\n'
  + '      {...rest}\n'
  + '    />\n'
  + '  );\n'
  + '}\n'
  + '\n'
  + "Input.displayName = 'Input';\n"
  + '\n'
  + 'function mergeStyles(styles: (CSSProperties | false | undefined)[]) {\n'
  + '  return styles.reduce((prev, next) => {\n'
  + '    return next ? merge(prev as CSSProperties, next) : prev;\n'
  + '  }, {}) as CSSProperties;\n'
  + '}\n'
  ;

sourceCode['Input.module.scss'] = ''
  + '.input {\n'
  + '  height: var(--input-height);\n'
  + '  min-width: var(--input-min-width);\n'
  + '  padding-inline: var(--input-padding-inline);\n'
  + '  border-width: 1px;\n'
  + '  border-style: solid;\n'
  + '  border-color: var(--input-border-color);;\n'
  + '  border-radius: var(--input-border-radius);\n'
  + '  font-size: var(--input-font-size);\n'
  + '  line-height: var(--input-line-height);\n'
  + '  caret-color: var(--input-caret-color);\n'
  + '\n'
  + '  &:focus {\n'
  + '    outline: none;\n'
  + '    border-color: var(--input-border-color-focus);\n'
  + '  }\n'
  + '\n'
  + '  &::placeholder {\n'
  + '    color: var(--input-placeholder-color);\n'
  + '  }\n'
  + '}\n'
  ;

