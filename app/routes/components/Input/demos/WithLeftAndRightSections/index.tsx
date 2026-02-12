import { Search } from "lucide-react";

import { useTheme } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { Input } from "@/components/Input";

export default function Demo() {
  const theme = useTheme();

  return (
    <Flex dir="column" gap="1rem">
      <Input
        leftSection={<Search color={theme.colors.gray["600"]} size="50%" />}
        placeholder="Search..."
      />
      <Input rightSection={<span>$</span>} size="lg" placeholder="1,000,000" />
    </Flex>
  );
}
