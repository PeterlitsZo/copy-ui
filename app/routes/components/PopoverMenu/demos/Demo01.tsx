import { Avatar } from "@/components/Avatar";
import { PopoverMenu } from "@/components/PopoverMenu";
import { useToast } from "@/components/Toast";

export default function Demo() {
  const { addToast } = useToast();

  return (
    <PopoverMenu
      trigger={({ setRef, onToggle }) => (
        <Avatar size="2.5rem" ref={setRef} onClick={onToggle}>
          <Avatar.Img
            src="https://github.com/peterlitszo.png"
            alt="Peterlits Zo"
          />
          <Avatar.Fallback>PZ</Avatar.Fallback>
        </Avatar>
      )}
    >
      <PopoverMenu.Item onClick={() => addToast("Item 1 clicked")}>
        Item 1
      </PopoverMenu.Item>
      <PopoverMenu.Item onClick={() => addToast("Item 2 clicked")}>
        Item 2
      </PopoverMenu.Item>
      <PopoverMenu.Item onClick={() => addToast("Item 3 clicked")}>
        Item 3
      </PopoverMenu.Item>
    </PopoverMenu>
  );
}
