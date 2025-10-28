import { useState } from "react";

import { Flex } from "@/components/Flex/flex";
import { Paper } from "@/components/Paper";
import { type Placement, Popover } from "@/components/Popover";
import { Select } from "@/components/Select";

import styles from "./Demo01.module.scss";

export default function Demo() {
  const [placement, setPlacement] = useState(null as Placement | null);

  const placementOptions: Array<{ label: string; value: Placement }> = [
    { label: "Top Start", value: "top-start" },
    { label: "Top", value: "top" },
    { label: "Top End", value: "top-end" },
    { label: "Right Start", value: "right-start" },
    { label: "Right", value: "right" },
    { label: "Right End", value: "right-end" },
    { label: "Bottom Start", value: "bottom-start" },
    { label: "Bottom", value: "bottom" },
    { label: "Bottom End", value: "bottom-end" },
    { label: "Left Start", value: "left-start" },
    { label: "Left", value: "left" },
    { label: "Left End", value: "left-end" },
  ];

  return (
    <Flex dir="column" gap="5rem">
      <Popover placement={placement || undefined}>
        <Popover.Trigger
          render={({ setRef, onToggle }) => (
            <Paper
              ref={(el) => setRef(el)}
              onClick={onToggle}
              className={styles.popoverTriggerCard}
              withBorder
              withPadding
            >
              Open Popover Portal
            </Paper>
          )}
        />
        <Popover.Portal
          onClickOutside={({ closePortal: close }) => close()}
          render={({ setRef, isOpen, floatingStyles }) =>
            isOpen && (
              <Paper
                ref={(el) => setRef(el)}
                style={floatingStyles}
                className={styles.popoverPortal}
                withBorder
              >
                You click to open me!
              </Paper>
            )
          }
        />
      </Popover>
      <Select
        value={placement}
        placeholder="Select placement"
        onChange={(value) => setPlacement(value)}
        options={placementOptions}
      />
    </Flex>
  );
}
