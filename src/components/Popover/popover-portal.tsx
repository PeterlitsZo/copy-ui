import {
  type CSSProperties,
  type FC,
  memo,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useStore } from "zustand";
import { Modal } from "../Modal";
import { usePopoverStore } from "./popover-context";

interface PopoverPortalRenderProps {
  setRef: (el: HTMLElement | null) => void;
  togglePortal: () => void;

  isOpen: boolean;
  floatingStyles: CSSProperties;
}

interface OnClickOutsideArgs {
  closePortal: () => void;
}

interface PopoverPortalProps {
  onClickOutside?: (args: OnClickOutsideArgs) => void;

  render: (props: PopoverPortalRenderProps) => ReactNode;
}

const PopoverPortal: FC<PopoverPortalProps> = (props) => {
  const { onClickOutside, render } = props;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const popoverStore = usePopoverStore();

  const isOpen = useStore(popoverStore, (state) => state.isOpen);
  const floatingStyles = useStore(
    popoverStore,
    (state) => state.floatingStyles,
  );
  const elRef = useStore(popoverStore, (state) => state.elRef);
  const floatingRef = useStore(popoverStore, (state) => state.floatingRef);
  const setFloatingRef = useStore(
    popoverStore,
    (state) => state.setFloatingRef,
  );
  const toggle = useStore(popoverStore, (state) => state.toggle);
  const close = useStore(popoverStore, (state) => state.close);
  const disablePortalClickHandler = useStore(
    popoverStore,
    (state) => state.disableTriggerClickHandler,
  );

  useEffect(() => {
    const floatingRefOriginal = floatingRef;
    if (!floatingRefOriginal) return;

    /** Check if the click is outside the popover portal */
    function handleClickOutside(event: MouseEvent) {
      if (!floatingRefOriginal || !event.target) return;

      if (!floatingRefOriginal.contains(event.target as Node)) {
        // Call the handle for click outside.
        onClickOutside?.({
          closePortal: close,
        });

        if (elRef) {
          const elRefOriginal = elRef;
          function handleMouseUp(event: MouseEvent) {
            event.preventDefault();

            // If we clicked on the `elRef` (trigger), we need to disable the
            // trigger click handler (then the trigger will ignore the following
            // click event & enable the handler for the next click).
            if (elRefOriginal.contains(event.target as Node)) {
              disablePortalClickHandler();
            }

            document.removeEventListener("mouseup", handleMouseUp);
          }
          document.addEventListener("mouseup", handleMouseUp);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [floatingRef, elRef, close, onClickOutside, disablePortalClickHandler]);

  const PopoverPortalRender = useMemo(() => memo(render), [render]);

  if (!mounted) return null;

  return (
    <Modal.Raw>
      <PopoverPortalRender
        setRef={setFloatingRef}
        togglePortal={toggle}
        isOpen={isOpen}
        floatingStyles={floatingStyles}
      />
    </Modal.Raw>
  );
};

PopoverPortal.displayName = "Popover.Portal";

export { PopoverPortal };
