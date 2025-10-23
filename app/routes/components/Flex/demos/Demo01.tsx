import { Card } from "@/components/Card";
import { Flex } from "@/components/Flex";

export default function Demo() {
  return (
    <Flex dir="row" gap="1rem" style={{ width: "40rem" }}>
      <Card>
        <Card.Content>Card 1</Card.Content>
      </Card>
      <Card>
        <Card.Content>Card 2</Card.Content>
      </Card>
      <Card>
        <Card.Content>Card 3</Card.Content>
      </Card>
    </Flex>
  );
}
