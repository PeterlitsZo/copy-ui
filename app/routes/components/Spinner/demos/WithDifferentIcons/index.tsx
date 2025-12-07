import { Baby, Loader2Icon, LoaderIcon, LoaderPinwheel } from "lucide-react";
import { Flex } from "@/components/Flex";
import { Spinner } from "@/components/Spinner";

export default function Demo() {
  return (
    <Flex dir="row" gap="2rem" alignItems="center">
      <Spinner size="1.5rem" icon={LoaderIcon} />
      <Spinner size="1.5rem" icon={Loader2Icon} />
      <Spinner size="1.5rem" icon={LoaderPinwheel} />
      <Spinner size="1.5rem" icon={Baby} />
    </Flex>
  );
}
