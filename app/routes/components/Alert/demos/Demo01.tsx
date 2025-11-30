import { AlertCircle } from "lucide-react";
import { Alert } from "@/components/Alert";
import { useJss } from "@/components/CopyUiProvider";

export default function Demo() {
  const jss = useJss();

  const stx = jss.hash({
    width: "30rem",
  });

  return (
    <Alert color="red" className={stx}>
      <AlertCircle size="1.25rem" />
      <Alert.Title>Foobar</Alert.Title>
      <Alert.Description>Some description.</Alert.Description>
    </Alert>
  );
}
