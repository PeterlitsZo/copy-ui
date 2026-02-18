- 0.1.0 (2025-09-08): Initial version.
- 0.1.1 (2025-09-11): Support the prop `onClickOutside` of `Popover.Portal`.
  Refactor it to make it simpler with zustand. Use `autoUpdate` from
  `@floating-ui/react` to handle the position update automatically. etc.
- 0.1.2 (2025-09-22): Add support for disabling the trigger click handler when
  clicking outside the portal but clicking the trigger as well.
- 0.1.3 (2025-09-25): Add `placement` prop to `Popover` to control the placement
  of the portal.
- 0.1.4 (2025-09-25): Support `onOpen` and `onClose` props for
  `Popover.Trigger`'s render. And rename its `onClick` props to `onToggle`.
- 0.1.5 (2025-10-03): Fix missing dependencies in useEffect hooks.
- 0.1.6 (2025-10-26): Using `Modal` component in `Popover.Portal` to handle the
  portal rendering.
- 0.1.7 (2025-10-27): Make `Popover.Trigger`'s render can have prop `isOpen`.
- 0.1.8 (2025-10-28): Using `Modal.Raw` rather than `Modal`. Export the type
  `PopoverTriggerRender`.
- 0.1.9 (2025-11-15): Add `offset` prop to `Popover` to control the distance
  between the trigger and the portal.
- 0.1.10 (2025-11-26): Support `anchor="pointer"` to make the popover follow the
  mouse cursor.
- 0.1.11 (2025-11-28): Use `useClickOutside` hook from `CopyUiProvider` to
  handle the click outside event -- make nested popover components work
  correctly.
- 0.1.12 (2025-12-14): Add `openDelay` prop to `Popover.Trigger` to control the
  delay time before the popover is opened.
