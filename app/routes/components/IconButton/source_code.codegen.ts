export const sourceCode: Record<string, string> = {};

sourceCode['IconButton.module.scss'] = ''
  + '.iconButton {\n'
  + '  display: flex;\n'
  + '  align-items: center;\n'
  + '  justify-content: center;\n'
  + '\n'
  + '  height: var(--button-size);\n'
  + '  width: var(--button-size);\n'
  + '  background-color: var(--button-bg);\n'
  + '  color: var(--button-color);\n'
  + '  border: var(--button-border-width) var(--button-border-style) var(--button-border-color);\n'
  + '  border-radius: var(--button-radius);\n'
  + '\n'
  + '  cursor: pointer;\n'
  + '\n'
  + '  &:hover {\n'
  + '    background-color: var(--button-bg-hover);\n'
  + '  }\n'
  + '}\n'
  ;

sourceCode['IconButton.tsx'] = ''
  + 'import { useContext, type ComponentProps, type CSSProperties, type FC} from "react";\n'
  + 'import classNames from "classnames";\n'
  + "import { merge } from 'es-toolkit';\n"
  + '\n'
  + 'import { ThemeContext } from "../ThemeProvider";\n'
  + '\n'
  + 'import styles from "./IconButton.module.scss";\n'
  + '\n'
  + "export type IconButtonProps = ComponentProps<'button'> & {\n"
  + "  variant?: 'default' | 'filled';\n"
  + "  size?: 'sm' | 'md' | 'lg';\n"
  + '};\n'
  + '\n'
  + 'export const IconButton: FC<IconButtonProps> = (props) => {\n'
  + '  const theme = useContext(ThemeContext);\n'
  + '\n'
  + "  const { className, style, variant = 'default', size = 'md', ...rest } = props;\n"
  + '\n'
  + '  const computedStyle = mergeStyles([\n'
  + "    variant === 'default' && {\n"
  + "      '--button-bg': 'white',\n"
  + "      '--button-color': theme.colors.gray['800'],\n"
  + "      '--button-border-width': '1px',\n"
  + "      '--button-border-style': 'solid',\n"
  + "      '--button-border-color': theme.tokens.inputBaseDefaultBorderColor,\n"
  + "      '--button-bg-hover': theme.colors.gray['100'],\n"
  + '    } as CSSProperties,\n'
  + "    variant === 'filled' && {\n"
  + "      '--button-bg': theme.colors.blue['600'],\n"
  + "      '--button-color': 'white',\n"
  + "      '--button-border-width': '1px',\n"
  + "      '--button-border-style': 'solid',\n"
  + "      '--button-border-color': theme.colors.blue['700'],\n"
  + "      '--button-bg-hover': theme.colors.blue['700'],\n"
  + '    } as CSSProperties,\n'
  + "    size === 'sm' && {\n"
  + "      '--button-size': '2rem',\n"
  + '    } as CSSProperties,\n'
  + "    size === 'md' && {\n"
  + "      '--button-size': '2.25rem',\n"
  + '    } as CSSProperties,\n'
  + "    size === 'lg' && {\n"
  + "      '--button-size': '2.5rem',\n"
  + '    } as CSSProperties,\n'
  + '    {\n'
  + "      '--button-radius': '0.375rem',\n"
  + '    } as CSSProperties,\n'
  + '    style,\n'
  + '  ]);\n'
  + '\n'
  + '  return (\n'
  + '    <button className={classNames(styles.iconButton, className)} style={computedStyle} {...rest}>\n'
  + '      {props.children}\n'
  + '    </button>\n'
  + '  );\n'
  + '}\n'
  + '\n'
  + 'function mergeStyles(styles: (CSSProperties | false | undefined)[]) {\n'
  + '  return styles.reduce((prev, next) => {\n'
  + '    return next ? merge(prev as CSSProperties, next) : prev;\n'
  + '  }, {}) as CSSProperties;\n'
  + '}\n'
  ;

sourceCode['index.ts'] = ''
  + '// IconButton from copy-ui @ 2025-09-26\n'
  + '\n'
  + "export { IconButton } from './IconButton';\n"
  + "export type { IconButtonProps } from './IconButton';\n"
  ;

