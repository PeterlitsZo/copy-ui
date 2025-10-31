import { useRef } from "react";
import { Button } from "src/components/Button";
import { Tooltip } from "src/components/Tooltip";

export default function Demo() {
  const openTooltipRef = useRef<null | (() => void)>(null);
  const closeTooltipRef = useRef<null | (() => void)>(null);
  const timeoutIdRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = () => {
    timeoutIdRef.current = setTimeout(() => {
      openTooltipRef.current?.();
    }, 300);
  };

  const handleMouseLeave = () => {
    closeTooltipRef.current?.();
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  return (
    <Tooltip
      label="This is a tooltip"
      triggerRender={({ setRef, onOpen, onClose }) => {
        openTooltipRef.current = onOpen;
        closeTooltipRef.current = onClose;

        return (
          <Button
            ref={setRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Hover me for a while
          </Button>
        );
      }}
    />
  );
}
