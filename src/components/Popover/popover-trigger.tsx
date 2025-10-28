import { type FC, memo, useMemo } from "react";
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
  render: PopoverTriggerRender;
}

const PopoverTrigger: FC<PopoverTriggerProps> = (props) => {
  const { render } = props;

  const popoverStore = usePopoverStore();

  const isOpen = useStore(popoverStore, (state) => state.isOpen);
  const toggle = useStore(popoverStore, (state) => state.toggle);
  const open = useStore(popoverStore, (state) => state.open);
  const close = useStore(popoverStore, (state) => state.close);
  const setElRef = useStore(popoverStore, (state) => state.setElRef);
  const enableTriggerClickHandler = useStore(
    popoverStore,
    (state) => state.enableTriggerClickHandler,
  );
  const triggerClickHandlerEnabled = useStore(
    popoverStore,
    (state) => state.triggerClickHandlerEnabled,
  );

  const PopoverTriggerRender = useMemo(() => memo(render), [render]);

  return (
    <PopoverTriggerRender
      setRef={setElRef}
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
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
