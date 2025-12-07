import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useJss } from "@/components/CopyUiProvider";

export default function Demo() {
  const jss = useJss();

  const footerStx = jss.hash({
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
  });

  return (
    <Card width="20rem">
      <Card.Header>This is the Card Header</Card.Header>
      <Card.Content>
        This is a Card component with some content inside. You can write
        anything you want here.
      </Card.Content>
      <Card.Footer className={footerStx}>
        <Button variant="light" size="sm">
          Confirm
        </Button>
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
      </Card.Footer>
    </Card>
  );
}
