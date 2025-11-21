import { useJss } from "@/components/CopyUiProvider";
import { FileInput } from "@/components/FileInput";
import { Flex } from "@/components/Flex";

export default function Demo() {
  const jss = useJss();

  const stx = jss.hash({
    width: "30rem",
  });

  return (
    <Flex dir="column" gap="1rem" className={stx}>
      <FileInput width="sm" placeholder="Choose file..." />
      <FileInput width="md" placeholder="Choose file..." />
      <FileInput width="lg" placeholder="Choose file..." />
      <FileInput width="full" placeholder="Choose file..." />
    </Flex>
  );
}
