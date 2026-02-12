import type { CSSProperties } from "react";
import { createStore } from "zustand";

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

export { buildPopoverStore };
export type { PopoverStore };
