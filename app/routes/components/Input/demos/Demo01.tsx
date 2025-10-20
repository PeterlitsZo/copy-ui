import { Search } from "lucide-react";

import { Flex } from "@/components/Flex/Flex";
import { Input } from "@/components/Input";
import { useTheme } from "@/components/ThemeProvider";

export default function Demo() {
  const theme = useTheme();

  return (
    <Flex dir="column" gap="1rem">
      <Input
        leftSection={<Search color={theme.colors.gray["600"]} size="60%" />}
        size="sm"
        placeholder="Search..."
      />
      <Input placeholder="Type something..." />
      <Input rightSection={<span>$</span>} size="lg" placeholder="1,000,000" />
      <Input disabled placeholder="Disabled input" />
    </Flex>
  );
}
