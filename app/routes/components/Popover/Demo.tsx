import { useState } from "react";

import { Button } from "src/components/Button";
import { Popover, type Placement } from "src/components/Popover";
import { Select } from "src/components/Select";

import styles from "./Demo.module.scss";

export function Demo() {
  const [placement, setPlacement] = useState(null as Placement | null);

  const placementOptions: Array<{ label: string, value: Placement }> = [
    { label: 'Top Start', value: 'top-start' },
    { label: 'Top', value: 'top' },
    { label: 'Top End', value: 'top-end' },
    { label: 'Right Start', value: 'right-start' },
    { label: 'Right', value: 'right' },
    { label: 'Right End', value: 'right-end' },
    { label: 'Bottom Start', value: 'bottom-start' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Bottom End', value: 'bottom-end' },
    { label: 'Left Start', value: 'left-start' },
    { label: 'Left', value: 'left' },
    { label: 'Left End', value: 'left-end' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
      <Popover placement={placement || undefined}>
        <Popover.Trigger
          render={({ setRef, onClick }) => (
            <div
              ref={(el) => setRef(el)} onClick={onClick}
              className={styles.popoverTrigger}
            >
              Open Popover Portal
            </div>
          )}
        />
        <Popover.Portal
          onClickOutside={({ closePortal: close }) => close()}
          render={({ setRef, isOpen, floatingStyles }) => (
            isOpen && (
              <div
                ref={(el) => setRef(el)}
                style={floatingStyles}
                className={styles.popoverPortal}
              >
                You click to open me!
              </div>
            )
          )}
        />
      </Popover>
      <Select
        value={placement}
        placeholder="Select placement"
        onChange={(value) => setPlacement(value)}
        options={placementOptions}
      />
    </div>
  );
}
