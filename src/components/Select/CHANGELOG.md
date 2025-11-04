- 2025-09-23: Initial version.
- 2025-09-25: Allow props to accept generics.
- 2025-09-25: Use `onToggle` instead of `onClick` in `Popover.Trigger`'s render
  prop.
- 2025-10-03: Fix missing dependencies in useEffect hooks, etc.
- 2025-10-11: Support `id` prop for better form integration. Make it be able to
  uncontrolled. Support `defaultValue` prop. Code formatting improvements.
- 2025-10-26: Update styles (padding) to make it look better.
- 2025-10-27: Update styles when Select is opened or focused. Make its
  `min-width` be `8rem` now (rather than `16rem`).
- 2025-10-28: Refactor code to make code cleaner. Add a small gap in trigger.
- 2025-10-30: Add a `ResizeObserver` to the `Select.Trigger` to update the
  `Select.List`'s width when the trigger size changes.
- 2025-10-31: Add the check mark for the selected item in the list.
- 2025-11-04: Wrap the list with `ScrollArea` to make it scrollable when there
  are many options.
