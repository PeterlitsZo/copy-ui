export const demoSourceCode = ''
  + 'import { useState } from "react";\n'
  + '\n'
  + 'import { Button } from "src/components/Button";\n'
  + 'import { Popover, type Placement } from "src/components/Popover";\n'
  + 'import { Select } from "src/components/Select";\n'
  + '\n'
  + 'import styles from "./Demo.module.scss";\n'
  + '\n'
  + 'export function Demo() {\n'
  + '  const [placement, setPlacement] = useState(null as Placement | null);\n'
  + '\n'
  + '  const placementOptions: Array<{ label: string, value: Placement }> = [\n'
  + "    { label: 'Top Start', value: 'top-start' },\n"
  + "    { label: 'Top', value: 'top' },\n"
  + "    { label: 'Top End', value: 'top-end' },\n"
  + "    { label: 'Right Start', value: 'right-start' },\n"
  + "    { label: 'Right', value: 'right' },\n"
  + "    { label: 'Right End', value: 'right-end' },\n"
  + "    { label: 'Bottom Start', value: 'bottom-start' },\n"
  + "    { label: 'Bottom', value: 'bottom' },\n"
  + "    { label: 'Bottom End', value: 'bottom-end' },\n"
  + "    { label: 'Left Start', value: 'left-start' },\n"
  + "    { label: 'Left', value: 'left' },\n"
  + "    { label: 'Left End', value: 'left-end' },\n"
  + '  ];\n'
  + '\n'
  + '  return (\n'
  + "    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>\n"
  + '      <Popover placement={placement || undefined}>\n'
  + '        <Popover.Trigger\n'
  + '          render={({ setRef, onToggle }) => (\n'
  + '            <div\n'
  + '              ref={(el) => setRef(el)} onClick={onToggle}\n'
  + '              className={styles.popoverTrigger}\n'
  + '            >\n'
  + '              Open Popover Portal\n'
  + '            </div>\n'
  + '          )}\n'
  + '        />\n'
  + '        <Popover.Portal\n'
  + '          onClickOutside={({ closePortal: close }) => close()}\n'
  + '          render={({ setRef, isOpen, floatingStyles }) => (\n'
  + '            isOpen && (\n'
  + '              <div\n'
  + '                ref={(el) => setRef(el)}\n'
  + '                style={floatingStyles}\n'
  + '                className={styles.popoverPortal}\n'
  + '              >\n'
  + '                You click to open me!\n'
  + '              </div>\n'
  + '            )\n'
  + '          )}\n'
  + '        />\n'
  + '      </Popover>\n'
  + '      <Select\n'
  + '        value={placement}\n'
  + '        placeholder="Select placement"\n'
  + '        onChange={(value) => setPlacement(value)}\n'
  + '        options={placementOptions}\n'
  + '      />\n'
  + '    </div>\n'
  + '  );\n'
  + '}\n'
  ;
