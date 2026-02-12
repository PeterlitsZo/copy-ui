import { useJss } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { Input } from "@/components/Input";

export default function Demo() {
  const jss = useJss();

  const stx = jss.hash({
    width: "30rem",
  });

  return (
    <Flex dir="column" gap="1rem" className={stx}>
      <Input w="12rem" placeholder="Type something..." />
      <Input w="16rem" placeholder="Type something..." />
      <Input w="20rem" placeholder="Type something..." />
      <Input w="100%" placeholder="Type something..." />
    </Flex>
  );
}
