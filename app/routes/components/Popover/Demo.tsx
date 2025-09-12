import { Button } from "src/components/Button";
import { Popover } from "src/components/Popover";

import styles from "./Demo.module.scss";

export function Demo() {
  return (
    <Popover>
      <Popover.Trigger
        render={({ setRef, onClick }) => (
          <Button ref={(el) => setRef(el)} onClick={onClick}>Open</Button>
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
  );
}
