export const sourceCode: Record<string, string> = {};

sourceCode['Avatar.tsx'] = ''
  + 'import type { CSSProperties, FC } from "react";\n'
  + '\n'
  + 'import styles from "./Avatar.module.scss";\n'
  + 'import { useTheme } from "../ThemeProvider";\n'
  + '\n'
  + 'interface AvatarProps {\n'
  + '  size: string;\n'
  + '  color?: string;\n'
  + '  children?: React.ReactNode;\n'
  + '}\n'
  + '\n'
  + 'export const Avatar: FC<AvatarProps> = (props) => {\n'
  + "  const { size, color = 'blue', children } = props;\n"
  + '\n'
  + '  const theme = useTheme();\n'
  + '\n'
  + '  const style = {\n'
  + "    '--avatar-size': size,\n"
  + "    '--avatar-color': theme.colors[color]['600'],\n"
  + "    '--avatar-background-color': theme.colors[color]['000']\n"
  + '  } as CSSProperties;\n'
  + '\n'
  + '  return (\n'
  + '    <div\n'
  + '      className={styles.avatar}\n'
  + '      style={style}\n'
  + '    >\n'
  + '      {children}\n'
  + '    </div>\n'
  + '  );\n'
  + '}\n'
  + '\n'
  + 'Avatar.displayName = "Avatar";\n'
  ;

sourceCode['Avatar.module.scss'] = ''
  + '.avatar {\n'
  + '  display: inline-flex;\n'
  + '  align-items: center;\n'
  + '  justify-content: center;\n'
  + '\n'
  + '  width: var(--avatar-size);\n'
  + '  height: var(--avatar-size);\n'
  + '\n'
  + '  font-size: calc(var(--avatar-size) / 2.25);\n'
  + '\n'
  + '  color: var(--avatar-color);\n'
  + '  border-radius: 999999px;\n'
  + '  background-color: var(--avatar-background-color);\n'
  + '\n'
  + '  user-select: none;\n'
  + '}\n'
  ;

sourceCode['index.ts'] = ''
  + '// Avatar from copy-ui @ 2025-09-23.\n'
  + '\n'
  + 'export { Avatar } from "./Avatar";\n'
  ;

