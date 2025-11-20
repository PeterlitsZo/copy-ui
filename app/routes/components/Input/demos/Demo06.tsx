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
      <Input width="sm" placeholder="Type something..." />
      <Input width="md" placeholder="Type something..." />
      <Input width="lg" placeholder="Type something..." />
      <Input width="full" placeholder="Type something..." />
    </Flex>
  );
}
