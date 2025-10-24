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

You can use the hook `useJss` for CSS-in-JS styling solution.

```tsx
import { useJss } from '@/components/CopyUiProvider'

const MyComponent = () => {
  const jss = useJss({
    padding: '16px',
    border: '1px solid black',
  })

  return <div className={jss}>Hello, world!</div>
}
```
