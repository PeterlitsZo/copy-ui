import { Avatar } from "src/components/Avatar";
import { Flex } from "@/components/Flex";

export default function Demo() {
  return (
    <Flex dir="row" alignItems="center" gap="1rem">
      <Avatar color="blue" size="2.5rem" variant="circle">
        <Avatar.Img
          src="https://github.com/peterlitszo.png"
          alt="Peterlits Zo"
        />
      </Avatar>
      <Avatar color="blue" size="2.5rem" variant="rounded">
        <Avatar.Img
          src="https://github.com/peterlitszo.png"
          alt="Peterlits Zo"
        />
      </Avatar>
    </Flex>
  );
}
