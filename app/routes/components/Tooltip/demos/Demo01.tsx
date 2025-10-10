import { Button } from "src/components/Button";
import { Tooltip } from "src/components/Tooltip";

export default function Demo() {
  return (
    <Tooltip
      label="This is a tooltip"
      triggerRender={({ setRef, onOpen, onClose }) => (
        <Button ref={setRef} onMouseEnter={onOpen} onMouseLeave={onClose}>
          Hover me
        </Button>
      )}
    />
  );
}
