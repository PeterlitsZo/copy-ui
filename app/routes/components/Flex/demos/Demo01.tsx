import { Card } from "@/components/Card";
import { useJss } from "@/components/CopyUiProvider";
import { Flex } from "@/components/Flex";

export default function Demo() {
  const jss = useJss();

  const flexStx = jss.hash({
    width: "40rem",
  });

  return (
    <Flex direction="row" gap="1rem" className={flexStx}>
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
