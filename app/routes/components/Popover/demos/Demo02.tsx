import { useState } from "react";
import { Flex } from "@/components/Flex";
import { Paper } from "@/components/Paper";
import { Popover } from "@/components/Popover";
import { Select } from "@/components/Select";
import styles from "./Demo01.module.scss";

export default function Demo() {
  const [offset, setOffset] = useState("8");

  const offsetOptions: Array<{ label: string; value: string }> = [
    { label: "0 px", value: "0" },
    { label: "4 px", value: "4" },
    { label: "8 px", value: "8" },
    { label: "12 px", value: "12" },
    { label: "16 px", value: "16" },
    { label: "24 px", value: "24" },
    { label: "32 px", value: "32" },
  ];

  return (
    <Flex dir="column" gap="4rem">
      <Popover placement="bottom-end" offset={Number.parseInt(offset, 10)}>
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
        value={offset}
        placeholder="Select placement"
        onChange={(value) => setOffset(value)}
        options={offsetOptions}
      />
    </Flex>
  );
}
