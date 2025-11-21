import { useState } from "react";

import { AlertDialog } from "@/components/AlertDialog";
import { Button } from "@/components/Button";

export default function Demo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AlertDialog.Header>Delete Item</AlertDialog.Header>
        <AlertDialog.Content>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </AlertDialog.Content>
        <AlertDialog.Footer>
          <AlertDialog.Cancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => setIsOpen(false)}>
            Delete
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog>
      <Button onClick={() => setIsOpen(true)}>Delete Item</Button>
    </>
  );
}
