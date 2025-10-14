import { useState } from "react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";

export default function Demo01() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen}>
        <Modal.Overlay onClick={() => setIsOpen(false)} />
        <Modal.Content>
          <Typography.Root>
            <Typography.H2>Modal Title</Typography.H2>
            <Typography.P>
              This is a simple modal example using the Modal component from Copy
              UI.
            </Typography.P>
          </Typography.Root>
        </Modal.Content>
      </Modal>
    </>
  );
}
