import { Star } from "lucide-react";

import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { useTheme } from "@/components/ThemeProvider";

export default function Demo() {
  const theme = useTheme();

  const cardStyle = {
    width: "20rem",
    border: `1px solid ${theme.colors.gray["200"]}`,
    borderRadius: "1rem",
    padding: "1rem",
    backgroundColor: "white",
  };
  const ddiaCard = (
    <Flex dir="column" alignItems="flex-start" gap="1rem" style={cardStyle}>
      <h1 style={{ fontSize: "1.5rem" }}>
        Designing Data-Intensive Application
      </h1>
      <Flex alignItems="center" gap="0.5rem">
        <Button size="sm" leftSection={<Star size="1rem" />}>
          Add to favorites
        </Button>
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
      </Flex>
    </Flex>
  );

  const helloWorldCard = (
    <Flex dir="row" alignItems="center" gap="0.75rem" wrap style={cardStyle}>
      <Button size="xs">Oh</Button>
      <Button size="sm" variant="filled">
        I mean
      </Button>
      <Button>Hello</Button>
      <Button size="lg" variant="filled" disabled>
        World
      </Button>
      <Button size="xl" variant="light">
        And you
      </Button>
    </Flex>
  );

  return (
    <Flex dir="row" gap="1rem" alignItems="center">
      {ddiaCard}
      {helloWorldCard}
    </Flex>
  );
}
