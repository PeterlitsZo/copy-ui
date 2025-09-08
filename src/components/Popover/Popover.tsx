'use client';

import { flip, offset, useFloating } from "@floating-ui/react";
import {
  createContext, useContext, useEffect, useLayoutEffect, useReducer,
  useState,
  type CSSProperties, type ReactNode,
} from "react";
import { createPortal } from "react-dom";

// PopoverContext
// =============================================================================

const PopoverContext = createContext<PopoverContextInner | null>(null);

type PopoverContextInner = {
  state: PopoverState;
  dispatch: React.Dispatch<PopoverAction>;
}

type PopoverState = {
  isOpen: boolean;
  floatingStyles: CSSProperties,
}

type PopoverAction =
  | { type: 'set-el-ref', ref: Element }
  | { type: 'set-floating-ref', ref: HTMLElement }
  | { type: 'toggle' }
  | { type: 'set-floating-styles', floatingStyles: CSSProperties };

interface ReducerBuilderArgs {
  setElRef: (el: Element) => void;
  setFloatingRef: (el: HTMLElement) => void;
}

function reducerBuilder({
  setElRef,
  setFloatingRef
}: ReducerBuilderArgs) {
  return (state: PopoverState, action: PopoverAction) => {
    switch (action.type) {
      case 'set-el-ref':
        setElRef(action.ref);
        return state;
      case 'set-floating-ref':
        setFloatingRef(action.ref);
        return state;
      case 'toggle':
        return { ...state, isOpen: !state.isOpen };
      case 'set-floating-styles':
        return { ...state, floatingStyles: action.floatingStyles };
      default:
        return state;
    }
  }
}

// PopoverTrigger
// =============================================================================

interface PopoverTriggerRenderProps {
  setRef: (el: Element) => void;

  onClick: () => void;
}

interface PopoverTriggerProps {
  render: (props: PopoverTriggerRenderProps) => ReactNode
}

function PopoverTrigger({ render }: PopoverTriggerProps) {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover.Trigger must be used within a Popover');
  }

  const handleClick = () => {
    context.dispatch({ type: 'toggle' });
  }

  return render({
    setRef: (el) => context.dispatch({ type: 'set-el-ref', ref: el }),
    onClick: handleClick,
  });
}

// PopoverPortal
// =============================================================================

interface PopoverPortalRenderProps {
  setRef: (el: HTMLElement) => void;

  isOpen: boolean;
  floatingStyles: CSSProperties;
}

interface PopoverPortalProps {
  render: (props: PopoverPortalRenderProps) => ReactNode
}

function PopoverPortal({ render }: PopoverPortalProps) {
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover.Portal must be used within a Popover');
  }

  if (!mounted) return null;

  return createPortal(
    render({
      setRef: (el) => context.dispatch({ type: 'set-floating-ref', ref: el }),
      isOpen: context.state.isOpen,
      floatingStyles: context.state.floatingStyles,
    }),
    document.body
  );
}

// Popover
// =============================================================================

export function Popover(props: { children: ReactNode }) {
  const { children } = props;

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-end',
    middleware: [
      offset(4),
      flip(),
    ],
  });

  const reducer = reducerBuilder({
    setElRef: refs.setReference,
    setFloatingRef: refs.setFloating,
  });
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    floatingStyles,
  });

  useEffect(() => {
    dispatch({
      type: 'set-floating-styles',
      floatingStyles,
    })
  }, [floatingStyles]);

  return (
    <PopoverContext value={{ state, dispatch }}>
      {children}
    </PopoverContext>
  )
}

Popover.Trigger = PopoverTrigger;
Popover.Portal = PopoverPortal;
