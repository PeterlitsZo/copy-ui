import { CodeBlock } from "@/components/CodeBlock/code-block";

const code = `\
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
`;

export default function Demo() {
  return (
    <CodeBlock
      code={code}
      lang="typescript"
      scrollAreaMaxHeight="15rem"
      title="foobar.tsx"
      withLineNumbers
    />
  );
}
