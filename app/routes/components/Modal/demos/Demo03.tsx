import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Modal } from "@/components/Modal";

export default function Demo01() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen}>
        <Modal.Overlay onClick={() => setIsOpen(false)} />
        <Modal.Content yOffset="5dvh" shadow>
          <Card>
            <Card.Header>Modal Title</Card.Header>
            <Card.Content>
              This is a simple modal example using the Modal component from Copy
              UI.
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>
    </>
  );
}
