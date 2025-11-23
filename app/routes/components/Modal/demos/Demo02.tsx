import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useJss } from "@/components/CopyUiProvider";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";

export default function Demo01() {
  const [isOpen, setIsOpen] = useState(false);

  const jss = useJss();
  const modalStx = jss.hash({
    position: "fixed",
    right: "1rem",
    bottom: "1rem",
  });

  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)}>Toggle Modal</Button>
      <Modal.Raw isOpen={isOpen} className={modalStx}>
        <Card>
          <Card.Header>Modal Title</Card.Header>
          <Card.Content>
            <Typography>
              <Typography.P>
                This is a simple modal example using the Modal component from
                Copy UI.
              </Typography.P>
              <Typography.P>
                <Button variant="filled" onClick={() => setIsOpen(false)}>
                  Close Modal
                </Button>
              </Typography.P>
            </Typography>
          </Card.Content>
        </Card>
      </Modal.Raw>
    </>
  );
}
