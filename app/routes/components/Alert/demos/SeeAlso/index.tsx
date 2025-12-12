import { AlertCircle } from "lucide-react";
import { Alert } from "@/components/Alert";
import { useJss } from "@/components/CopyUiProvider";

export default function Demo() {
  const jss = useJss();

  const stx = jss.hash({
    width: "30rem",
  });

  return (
    <Alert color="blue" className={stx}>
      <AlertCircle size="1.25rem" />
      <Alert.Title>See Also</Alert.Title>
      <Alert.Description>
        You can also check the CodeBlock component - it is built on top of
        CodeHighlight, but with more features (copy button, scroll area, etc.).
      </Alert.Description>
    </Alert>
  );
}
