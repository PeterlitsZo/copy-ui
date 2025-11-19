import { MoreVertical } from "lucide-react";

import { IconButton } from "@/components/IconButton";
import { PopoverMenu } from "@/components/PopoverMenu";
import { useToast } from "@/components/Toast";

export default function Demo() {
  const { addToast } = useToast();

  return (
    <PopoverMenu
      trigger={({ setRef, onToggle }) => (
        <IconButton ref={setRef} onClick={onToggle}>
          <MoreVertical />
        </IconButton>
      )}
    >
      <PopoverMenu.Item onClick={() => addToast("Edit clicked")}>
        Edit
      </PopoverMenu.Item>
      <PopoverMenu.Item onClick={() => addToast("Copy clicked")}>
        Copy
      </PopoverMenu.Item>
      <PopoverMenu.Separator />
      <PopoverMenu.Item onClick={() => addToast("Delete clicked")}>
        Delete
      </PopoverMenu.Item>
      <PopoverMenu.Item disabled onClick={() => addToast("Disabled item")}>
        Disabled Item
      </PopoverMenu.Item>
    </PopoverMenu>
  );
}
