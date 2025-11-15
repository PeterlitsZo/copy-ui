import { Star } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Flex } from "@/components/Flex";
import { Typography } from "@/components/Typography";

export default function Demo() {
  return (
    <Card>
      <Card.Header>Designing Data-Intensive Application</Card.Header>
      <Card.Content>
        <Flex dir="column" gap="1rem">
          <Typography>
            <Typography.P>
              Designing Data-Intensive Applications is a book about the
              architecture of scalable and maintainable data systems.
            </Typography.P>
          </Typography>
          <Flex gap="0.5rem">
            <Button variant="filled" size="sm" leftSection={<Star />}>
              Add to favorites
            </Button>
            <Button variant="light" size="sm" color="red">
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Card.Content>
    </Card>
  );
}
