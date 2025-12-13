import { Button } from "src/components/Button";
import { Tooltip } from "src/components/Tooltip";

export default function Demo() {
  return (
    <Tooltip
      anchor="pointer"
      placement="bottom-start"
      label="This is a tooltip"
      openDelay={750}
      triggerRender={({ onOpen, onClose }) => {
        return (
          <Button onMouseEnter={onOpen} onMouseLeave={onClose}>
            Hover me for a while
          </Button>
        );
      }}
    />
  );
}
