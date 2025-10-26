import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react";
import type { FC, ReactNode } from "react";
import { useEffect, useMemo } from "react";

import { PopoverContext } from "./popover-context";
import { PopoverPortal } from "./popover-portal";
import { buildPopoverStore } from "./popover-store";
import { PopoverTrigger } from "./popover-trigger";

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

const Popover: PopoverComponent = (props) => {
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

export { Popover };
