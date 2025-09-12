export const sourceCode: Record<string, string> = {};

sourceCode['SortIndicator.tsx'] = ''
  + 'import {\n'
  + '  ArrowDownUp,\n'
  + '  ArrowDownWideNarrow,\n'
  + '  ArrowUpWideNarrow,\n'
  + '} from "lucide-react";\n'
  + 'import { useState, type SVGAttributes } from "react";\n'
  + '\n'
  + "export type SortIndicatorDirection = 'asc' | 'desc' | 'none';\n"
  + '\n'
  + 'export function useSortIndicatorState(\n'
  + "  defaultDirection: SortIndicatorDirection = 'none'\n"
  + ') {\n'
  + '  const [direction, setDirection] = useState(defaultDirection);\n'
  + '\n'
  + '  const handleClick = () => {\n'
  + '    const nextDirection = ({\n'
  + "      asc: 'desc',\n"
  + "      desc: 'none',\n"
  + "      none: 'asc'\n"
  + '    } as const)[direction];\n'
  + '    setDirection(nextDirection);\n'
  + '  };\n'
  + '\n'
  + '  return { direction, handleClick };\n'
  + '}\n'
  + '\n'
  + 'export type SortIndicatorProps = SVGAttributes<SVGElement> & {\n'
  + '  direction: SortIndicatorDirection;\n'
  + '  size?: string | number;\n'
  + '}\n'
  + '\n'
  + 'export function SortIndicator(props: SortIndicatorProps) {\n'
  + '  const { direction, size, ...rest } = props;\n'
  + '\n'
  + '  const Icon = {\n'
  + '    asc: ArrowUpWideNarrow,\n'
  + '    desc: ArrowDownWideNarrow,\n'
  + '    none: ArrowDownUp\n'
  + '  }[props.direction];\n'
  + '\n'
  + '  return (\n'
  + '    <Icon\n'
  + '      size={size}\n'
  + '      {...rest}\n'
  + '    />\n'
  + '  );\n'
  + '}\n'
  ;

sourceCode['index.ts'] = ''
  + '// SortIndicator from copy-ui @ 2025-09-04\n'
  + '\n'
  + "export { SortIndicator, useSortIndicatorState } from './SortIndicator';\n"
  + 'export type {\n'
  + '  SortIndicatorDirection,\n'
  + '  SortIndicatorProps\n'
  + "} from './SortIndicator';\n"
  ;

