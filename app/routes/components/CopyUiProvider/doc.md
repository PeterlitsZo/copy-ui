## Usage

`CopyUiProvider` is a context provider for Copy UI components. You should wrap
your application with it to ensure that all Copy UI components function correctly.

```tsx
const App = () => {
  return (
    <CopyUiProvider>
      {children}
    </CopyUiProvider>
  )
}
```

It also provides some hooks to access the context values.

## Hooks

### useJss

You can use the hook `useJss` for CSS-in-JS styling solution.

```tsx
import { useJss } from '@/components/CopyUiProvider'

const MyComponent = () => {
  const jss = useJss();
  const stx = jss.hash({
    padding: '16px',
    border: '1px solid black',
  })

  return <div className={stx}>Hello, world!</div>
}
```

The `useJss` will return a generated class name based on the object. Like
`"cu-36xkWk"`. A CSS string will be generated as well and injected into the DOM,
like:

```css
.cu-36xkWk {
  padding: 16px;
  border: 1px solid black;
}
```

The reason to use `useJss` is just to avoid too long style definitions in the
`style` prop. So it is a very simple CSS-in-JS solution.

### useTheme

You can use the hook `useTheme` to access the theme object provided by
`CopyUiProvider`. Like:

```tsx
import { useTheme } from '@/components/CopyUiProvider'

const MyComponent = () => {
  const theme = useTheme();

  return (
    <div style={{ color: theme.colors.red['600'] }}>
      Hello, themed world!
    </div>
  )
}
```
