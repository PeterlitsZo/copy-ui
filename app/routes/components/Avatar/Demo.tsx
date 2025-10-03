import { Avatar } from "src/components/Avatar";
import { Flex } from "@/components/Flex";

export function Demo() {
  return (
    <Flex dir="column" alignItems="center" gap="1rem">
      <Flex dir="row" alignItems="center" gap="1rem">
        <Avatar color="blue" size="2.5rem">
          PZ
        </Avatar>
        <Avatar color="red" size="2.5rem">
          PZ
        </Avatar>
        <Avatar color="green" size="2.5rem">
          PZ
        </Avatar>
      </Flex>
      <Flex dir="row" alignItems="center" gap="1rem">
        <Avatar size="2.5rem">
          <Avatar.Img
            src="https://github.com/peterlitszo.png"
            alt="Peterlits Zo"
          />
        </Avatar>
        <Avatar size="2.5rem">
          <Avatar.Img src="https://github.com/shadcn.png" alt="Shadcn" />
        </Avatar>
      </Flex>
    </Flex>
  );
}
