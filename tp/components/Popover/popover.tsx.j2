import type { VirtualElement } from "@floating-ui/react";
import * as fui from "@floating-ui/react";
import { autoUpdate, useFloating } from "@floating-ui/react";
import { throttle } from "es-toolkit";
import type { FC, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "zustand";

import { PopoverContext } from "./popover-context";
import { PopoverPortal } from "./popover-portal";
import { buildPopoverStore } from "./popover-store";
import { PopoverTrigger } from "./popover-trigger";

export type PopoverProps = {
  placement?: Placement;
  offset?: number;
  anchor?: "element" | "pointer";

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
  const {
    placement = "bottom-end",
    offset = 4,
    anchor = "element",
    children,
  } = props;

  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const lastMousePositionRef = useRef<{ x: number; y: number } | null>(null);

  // Create virtual reference for pointer anchor
  const virtualReference = useMemo<VirtualElement | null>(() => {
    if (anchor !== "pointer") return null;

    if (!mousePosition) {
      return null;
    }

    return {
      getBoundingClientRect() {
        const result = {
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        };

        result.x = result.left = result.right = mousePosition.x;
        result.y = result.top = result.bottom = mousePosition.y;
        return result;
      },
    };
  }, [anchor, mousePosition]);

  const middleware = useMemo(() => {
    const result = [];

    if (offset !== 0) {
      result.push(fui.offset(offset));
    }
    result.push(fui.flip());

    return result;
  }, [offset]);

  const { refs, floatingStyles, update } = useFloating({
    placement,
    whileElementsMounted: anchor === "element" ? autoUpdate : undefined,
    middleware,
  });

  // Set virtual reference when anchor is pointer.
  useEffect(() => {
    if (anchor === "pointer" && virtualReference) {
      refs.setReference(virtualReference);
    }
  }, [anchor, virtualReference, refs]);

  const popoverStore = useMemo(() => {
    const noop = () => {};
    return buildPopoverStore({
      onSetElRef: anchor === "pointer" ? noop : refs.setReference,
      onSetFloatingRef: refs.setFloating,
    });
  }, [refs, anchor]);

  const isOpen = useStore(popoverStore, (state) => state.isOpen);

  // Track mouse position globally to have latest position available (throttled)
  useEffect(() => {
    const handleGlobalMouseMove = throttle((e: MouseEvent) => {
      lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
    }, 48); // ~20fps

    document.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      handleGlobalMouseMove.cancel();
    };
  }, []);

  // Track mouse position when anchor is pointer and popover is open.
  useEffect(() => {
    if (anchor !== "pointer" || !isOpen) {
      // Clear mouse position when popover closes.
      if (anchor === "pointer" && !isOpen) {
        setMousePosition(null);
      }
      return;
    }

    // Set initial position before adding listener using last known position
    if (mousePosition === null && lastMousePositionRef.current) {
      setMousePosition(lastMousePositionRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [anchor, isOpen, mousePosition]);

  useEffect(() => {
    popoverStore.getState().setFloatingStyles(floatingStyles);
  }, [popoverStore, floatingStyles]);

  // Update floating position when mouse moves (for pointer anchor).
  useEffect(() => {
    if (anchor !== "pointer" || !mousePosition || !update) return;

    // Manually trigger update when mouse position changes.
    update();
  }, [anchor, mousePosition, update]);

  return <PopoverContext value={popoverStore}>{children}</PopoverContext>;
};

Popover.displayName = "Popover";

Popover.Trigger = PopoverTrigger;
Popover.Portal = PopoverPortal;

export { Popover };
