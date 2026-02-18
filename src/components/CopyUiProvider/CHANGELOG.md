- 0.1.0 (2025-10-24): Initial version.
- 0.1.1 (2025-10-25): Use `useRef` to avoid re-creating zustand store on each
  render.
- 0.1.2 (2025-10-27): Wrap children with `Toast.Context`.
- 0.1.3 (2025-11-04): Move the original `ThemeProvider` into `CopyUiProvider`
  and support the `useTheme`, etc. The `ThemeProvider` now is deprecated.
- 0.1.4 (2025-11-06): Export the `useTheme` hook. And remove the `style` tag
  built for SSR after hydration in `CopyUiProvider`.
- 0.1.5 (2025-11-08): Add simple MDX support for `CopyUiProvider`.
- 0.1.6 (2025-11-15): Export the `ColorName` and `ColorNo` types. Add colors
  cyan, teal, lime and orange to the theme.
- 0.1.7 (2025-11-17): Export type `Theme`. And Enhance internal MdxProvider to
  use more sub-components of `Typography`.
- 0.1.8 (2025-11-22): Add `useMode` and `useSetMode` hooks, support the `mode`
  state.
- 0.1.9 (2025-11-28): Add internal `ClickOutsideEventListener` class and the
  `useClickOutside` hook to handle the click outside event.
