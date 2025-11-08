- 2025-10-24: Initial version.
- 2025-10-25: Use `useRef` to avoid re-creating zustand store on each render.
- 2025-10-27: Wrap children with `Toast.Context`.
- 2025-11-04: Move the original `ThemeProvider` into `CopyUiProvider` and
  support the `useTheme`, etc. The `ThemeProvider` now is deprecated.
- 2025-11-06: Export the `useTheme` hook. And remove the `style` tag built for
  SSR after hydration in `CopyUiProvider`.
- 2025-11-08: Add simple MDX support for `CopyUiProvider`.
