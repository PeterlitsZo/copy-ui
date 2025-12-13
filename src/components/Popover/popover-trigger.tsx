import { type FC, memo, useCallback, useMemo, useRef } from "react";
import { useStore } from "zustand";
import { usePopoverStore } from "./popover-context";

interface PopoverTriggerRenderProps {
  setRef: (el: Element | null) => void;

  isOpen: boolean;

  onToggle: () => void;
  onClose: () => void;
  onOpen: () => void;
}

type PopoverTriggerRender = FC<PopoverTriggerRenderProps>;

interface PopoverTriggerProps {
  openDelay?: number;
  render: PopoverTriggerRender;
}

const PopoverTrigger: FC<PopoverTriggerProps> = (props) => {
  const { openDelay = 0, render } = props;

  const popoverStore = usePopoverStore();

  const isOpen = useStore(popoverStore, (state) => state.isOpen);
  const toggle = useStore(popoverStore, (state) => state.toggle);
  const openInternal = useStore(popoverStore, (state) => state.open);
  const closeInternal = useStore(popoverStore, (state) => state.close);
  const setElRef = useStore(popoverStore, (state) => state.setElRef);
  const enableTriggerClickHandler = useStore(
    popoverStore,
    (state) => state.enableTriggerClickHandler,
  );
  const triggerClickHandlerEnabled = useStore(
    popoverStore,
    (state) => state.triggerClickHandlerEnabled,
  );

  const timeoutIdRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleOpen = useCallback(() => {
    if (openDelay > 0) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        openInternal();
      }, openDelay);
    } else {
      openInternal();
    }
  }, [openDelay, openInternal]);

  const handleClose = useCallback(() => {
    closeInternal();
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, [closeInternal]);

  const PopoverTriggerRender = useMemo(() => memo(render), [render]);

  return (
    <PopoverTriggerRender
      setRef={setElRef}
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      onToggle={() => {
        if (triggerClickHandlerEnabled) {
          toggle();
        } else {
          // Disable because we clicked outside the portal but click the
          // trigger.
          //
          // Now we need to reset it (by enable the trigger click handler).
          enableTriggerClickHandler();
        }
      }}
    />
  );
};

PopoverTrigger.displayName = "Popover.Trigger";

export { PopoverTrigger };
export type { PopoverTriggerRender };
