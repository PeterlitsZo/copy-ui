import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react";
import type { CSSProperties, FC, ReactNode } from "react";
import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { createStore, type StoreApi, useStore } from "zustand";

// PopoverStore
// =============================================================================

type PopoverStoreState = {
  isOpen: boolean;

  floatingStyles: CSSProperties;
  elRef: Element | null;
  floatingRef: HTMLElement | null;

  triggerClickHandlerEnabled: boolean;
};

type PopoverStoreActions = {
  toggle: () => void;
  open: () => void;
  close: () => void;

  setFloatingStyles: (floatingStyles: CSSProperties) => void;
  setElRef: (el: Element | null) => void;
  setFloatingRef: (el: HTMLElement | null) => void;

  disableTriggerClickHandler: () => void;
  enableTriggerClickHandler: () => void;
};

type PopoverStore = PopoverStoreState & PopoverStoreActions;

type BuildPopoverStoreArgs = {
  onSetElRef: (el: Element | null) => void;
  onSetFloatingRef: (el: HTMLElement | null) => void;
};

function buildPopoverStore(args: BuildPopoverStoreArgs) {
  return createStore<PopoverStore>()((set) => ({
    isOpen: false,
    floatingStyles: {},
    elRef: null,
    floatingRef: null,
    triggerClickHandlerEnabled: true,

    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    open: () => set(() => ({ isOpen: true })),
    close: () => set(() => ({ isOpen: false })),
    setFloatingStyles: (floatingStyles) => set(() => ({ floatingStyles })),
    setElRef: (el) =>
      set(() => {
        args.onSetElRef(el);
        return { elRef: el };
      }),
    setFloatingRef: (el) =>
      set(() => {
        args.onSetFloatingRef(el);
        return { floatingRef: el };
      }),
    disableTriggerClickHandler: () =>
      set(() => ({
        triggerClickHandlerEnabled: false,
      })),
    enableTriggerClickHandler: () =>
      set(() => ({
        triggerClickHandlerEnabled: true,
      })),
  }));
}

// PopoverContext
// =============================================================================

const PopoverContext = createContext<StoreApi<PopoverStore> | null>(null);

// PopoverTrigger
// =============================================================================

interface PopoverTriggerRenderProps {
  setRef: (el: Element | null) => void;

  onToggle: () => void;
  onClose: () => void;
  onOpen: () => void;
}

interface PopoverTriggerProps {
  render: (props: PopoverTriggerRenderProps) => ReactNode;
}

const PopoverTrigger: FC<PopoverTriggerProps> = (props) => {
  const { render } = props;

  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover.Trigger must be used within a Popover");
  }

  const toggle = useStore(context, (state) => state.toggle);
  const open = useStore(context, (state) => state.open);
  const close = useStore(context, (state) => state.close);
  const setElRef = useStore(context, (state) => state.setElRef);
  const enableTriggerClickHandler = useStore(
    context,
    (state) => state.enableTriggerClickHandler,
  );
  const triggerClickHandlerEnabled = useStore(
    context,
    (state) => state.triggerClickHandlerEnabled,
  );

  const PopoverTriggerRender = useMemo(() => memo(render), [render]);

  return (
    <PopoverTriggerRender
      setRef={setElRef}
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

PopoverTrigger.displayName = "PopoverTrigger";

// PopoverPortal
// =============================================================================

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

  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover.Portal must be used within a Popover");
  }

  const isOpen = useStore(context, (state) => state.isOpen);
  const floatingStyles = useStore(context, (state) => state.floatingStyles);
  const elRef = useStore(context, (state) => state.elRef);
  const floatingRef = useStore(context, (state) => state.floatingRef);
  const setFloatingRef = useStore(context, (state) => state.setFloatingRef);
  const toggle = useStore(context, (state) => state.toggle);
  const close = useStore(context, (state) => state.close);
  const disablePortalClickHandler = useStore(
    context,
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

  return createPortal(
    <PopoverPortalRender
      setRef={setFloatingRef}
      togglePortal={toggle}
      isOpen={isOpen}
      floatingStyles={floatingStyles}
    />,
    document.body,
  );
};

PopoverPortal.displayName = "PopoverPortal";

// Popover
// =============================================================================

export type PopoverProps = {
  placement?: Placement;

  children: ReactNode;
};

type Side = "top" | "right" | "bottom" | "left";
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
export type Placement = Prettify<Side | `${Side}-start` | `${Side}-end`>;

type PopoverComponent = FC<PopoverProps> & {
  Trigger: typeof PopoverTrigger;
  Portal: typeof PopoverPortal;
};

export const Popover: PopoverComponent = (props) => {
  const { placement = "bottom-end", children } = props;

  const { refs, floatingStyles } = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(4), flip()],
  });

  const popoverStore = useMemo(() => {
    return buildPopoverStore({
      onSetElRef: refs.setReference,
      onSetFloatingRef: refs.setFloating,
    });
  }, [refs]);

  useEffect(() => {
    popoverStore.getState().setFloatingStyles(floatingStyles);
  }, [popoverStore, floatingStyles]);

  return <PopoverContext value={popoverStore}>{children}</PopoverContext>;
};

Popover.displayName = "Popover";

Popover.Trigger = PopoverTrigger;
Popover.Portal = PopoverPortal;
