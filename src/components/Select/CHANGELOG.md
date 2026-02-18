- 0.1.0 (2025-09-23): Initial version.
- 0.1.1 (2025-09-25): Allow props to accept generics.
- 0.1.2 (2025-09-25): Use `onToggle` instead of `onClick` in `Popover.Trigger`'s
  render prop.
- 0.1.3 (2025-10-03): Fix missing dependencies in useEffect hooks, etc.
- 0.1.4 (2025-10-11): Support `id` prop for better form integration. Make it be
  able to uncontrolled. Support `defaultValue` prop. Code formatting
  improvements.
- 0.1.5 (2025-10-26): Update styles (padding) to make it look better.
- 0.1.6 (2025-10-27): Update styles when Select is opened or focused. Make its
  `min-width` be `8rem` now (rather than `16rem`).
- 0.1.7 (2025-10-28): Refactor code to make code cleaner. Add a small gap in
  trigger.
- 0.1.8 (2025-10-30): Add a `ResizeObserver` to the `Select.Trigger` to update
  the `Select.List`'s width when the trigger size changes.
- 0.1.9 (2025-10-31): Add the check mark for the selected item in the list.
- 0.1.10 (2025-11-04): Wrap the list with `ScrollArea` to make it scrollable
  when there are many options.
- 0.1.11 (2025-11-21): Add `width` prop to control the width of the component.
  Remove the `min-width` constraint on the trigger. And remove the dependency on
  `ThemeProvider`.
- 0.1.12 (2025-11-24): Support the empty state.
- 0.1.13 (2025-11-28): Support the `xs` and `xl` width props.
