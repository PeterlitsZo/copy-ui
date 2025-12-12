import { CodeHighlight } from "@/components/CodeHighlight";
import { useJss, useTheme } from "@/components/CopyUiProvider";

import code from "./code.txt?raw";

export default function Demo() {
  const theme = useTheme();
  const jss = useJss();

  const stx = jss.hash({
    backgroundColor: theme.colors.gray["000"],
    borderRadius: "0.5rem",
    width: "40rem",
  });

  return (
    <CodeHighlight
      code={code}
      lang="typescript"
      withLineNumbers
      lineHighlight={{ ge: 4, lt: 7 }}
      className={stx}
      px="1.5rem"
      py="0.75rem"
    />
  );
}
