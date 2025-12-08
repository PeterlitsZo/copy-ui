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
      <FileInput w="12rem" placeholder="Choose file..." />
      <FileInput w="16rem" placeholder="Choose file..." />
      <FileInput w="20rem" placeholder="Choose file..." />
      <FileInput w="100%" placeholder="Choose file..." />
    </Flex>
  );
}
