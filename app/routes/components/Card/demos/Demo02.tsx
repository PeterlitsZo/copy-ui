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

  const contentStx = jss.hash({
    maxHeight: "15rem",
  });

  return (
    <Card width="20rem">
      <Card.Header withBorder>Card with Scrollable Content</Card.Header>
      <Card.ContentInScrollArea className={contentStx}>
        <div>
          <p>This is a Card component with scrollable content.</p>
          <p>
            When the content exceeds the maximum height, it becomes scrollable.
          </p>
          <p>Line 1</p>
          <p>Line 2</p>
          <p>Line 3</p>
          <p>Line 4</p>
          <p>Line 5</p>
          <p>Line 6</p>
          <p>Line 7</p>
          <p>Line 8</p>
          <p>Line 9</p>
          <p>Line 10</p>
          <p>Line 11</p>
          <p>Line 12</p>
          <p>Line 13</p>
          <p>Line 14</p>
          <p>Line 15</p>
        </div>
      </Card.ContentInScrollArea>
      <Card.Footer withBorder className={footerStx}>
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
