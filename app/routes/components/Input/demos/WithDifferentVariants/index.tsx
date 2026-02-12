import { Plus, Search } from "lucide-react";

import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";
import { IconButton } from "@/components/IconButton";
import { Input } from "@/components/Input";

export default function Demo() {
  const theme = useTheme();

  return (
    <Flex gap="1rem">
      <Input
        w="16rem"
        variant="filled"
        placeholder="Search your todos..."
        rightSection={<Search size="50%" color={theme.colors.gray["600"]} />}
      />
      <IconButton>
        <Plus />
      </IconButton>
      <Avatar size="2.125rem">
        <Avatar.Img src="https://github.com/peterlitszo.png" />
        <Avatar.Fallback>S</Avatar.Fallback>
      </Avatar>
    </Flex>
  );
}
