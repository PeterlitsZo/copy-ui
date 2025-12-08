import { CodeBlock } from "@/components/CodeBlock/code-block";

import code from "./code.txt?raw";

export default function Demo() {
  return (
    <CodeBlock
      code={code}
      lang="typescript"
      scrollAreaMaxHeight="15rem"
      withLineNumbers
      withCopyButton
    />
  );
}
