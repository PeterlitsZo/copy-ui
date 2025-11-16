- 2025-10-10: Initial version.
- 2025-10-24: Support render code blocks (using internal rehype plugins). Wrap
  its children in `Typography.Root`.
- 2025-11-16: Support render `strong`, `em`, `ol` elements by `Typography`'s
  sub-components. Use `Typography` instead of `Typography.Root` as the root
  component.