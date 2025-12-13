- 2025-09-08: Initial version.
- 2025-09-11: Support the prop `onClickOutside` of `Popover.Portal`.
  Refactor it to make it simpler with zustand. Use `autoUpdate` from
  `@floating-ui/react` to handle the position update automatically. etc.
- 2025-09-22: Add support for disabling the trigger click handler when clicking
  outside the portal but clicking the trigger as well.
- 2025-09-25: Add `placement` prop to `Popover` to control the placement of the
  portal.
- 2025-09-25: Support `onOpen` and `onClose` props for `Popover.Trigger`'s
  render. And rename its `onClick` props to `onToggle`.
- 2025-10-03: Fix missing dependencies in useEffect hooks.
- 2025-10-26: Using `Modal` component in `Popover.Portal` to handle the portal
  rendering.
- 2025-10-27: Make `Popover.Trigger`'s render can have prop `isOpen`.
- 2025-10-28: Using `Modal.Raw` rather than `Modal`. Export the type
  `PopoverTriggerRender`.
- 2025-11-15: Add `offset` prop to `Popover` to control the distance between the
  trigger and the portal.
- 2025-11-26: Support `anchor="pointer"` to make the popover follow the mouse
  cursor.
- 2025-11-28: Use `useClickOutside` hook from `CopyUiProvider` to handle the
  click outside event -- make nested popover components work correctly.
- 2025-12-14: Add `openDelay` prop to `Popover.Trigger` to control the delay
  time before the popover is opened.
