- 2025-10-02: Initial version.
- 2025-10-04: Support custom `style` prop and spread additional props. Extend
  from `ComponentProps<"div">` for better TypeScript support.
- 2025-10-26: Refactor to use `useJss` for styling.
- 2025-11-19: Make `Flex` support `direction`, `items` and `justify` prop as alias
  of `dir`, `alignItems` and `justifyContent`. Support `start` and `end` values
  for `justify` prop. Support append class by `className` prop.
