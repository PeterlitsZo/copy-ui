export const sourceCode: Record<string, string> = {};

sourceCode['ButtonGroup.tsx'] = ''
  + 'import type { FC, PropsWithChildren } from "react";\n'
  + '\n'
  + 'import styles from "./ButtonGroup.module.scss";\n'
  + '\n'
  + 'export type ButtonGroupProps = PropsWithChildren<{}>;\n'
  + '\n'
  + 'export const ButtonGroup: FC<ButtonGroupProps> = (props) => {\n'
  + '  return (\n'
  + '    <div className={styles.buttonGroup}>\n'
  + '      {props.children}\n'
  + '    </div>\n'
  + '  );\n'
  + '}\n'
  ;

sourceCode['ButtonGroup.module.scss'] = ''
  + '.buttonGroup {\n'
  + '  display: flex;\n'
  + '\n'
  + '  & > *:not(:only-child):first-child {\n'
  + '    border-end-end-radius: 0;\n'
  + '    border-start-end-radius: 0;\n'
  + '    border-inline-end-width: calc(var(--button-border-width) / 2);\n'
  + '  }\n'
  + '\n'
  + '  & > *:not(:only-child):not(:first-child):not(:last-child) {\n'
  + '    border-radius: 0;\n'
  + '    border-inline-start-width: calc(var(--button-border-width) / 2);\n'
  + '    border-inline-end-width: calc(var(--button-border-width) / 2);\n'
  + '  }\n'
  + '\n'
  + '  & > *:not(:only-child):last-child {\n'
  + '    border-start-start-radius: 0;\n'
  + '    border-end-start-radius: 0;\n'
  + '    border-inline-start-width: calc(var(--button-border-width) / 2);\n'
  + '  }\n'
  + '}\n'
  ;

sourceCode['index.ts'] = ''
  + '// ButtonGroup from copy-ui @ 2025-09-09\n'
  + '\n'
  + "export { ButtonGroup } from './ButtonGroup';\n"
  + "export type { ButtonGroupProps } from './ButtonGroup';\n"
  ;

