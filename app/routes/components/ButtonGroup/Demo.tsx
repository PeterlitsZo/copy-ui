import { Save, Send, Star, Trash } from "lucide-react";

import { Button } from "src/components/Button";
import { ButtonGroup } from "src/components/ButtonGroup";
import { IconButton } from "src/components/IconButton";

export function Demo() {
  return (
    <ButtonGroup>
      <Button leftSection={<Send size={"1.25rem"} />}>Send</Button>
      <IconButton>
        <Save size={"1.25rem"} />
      </IconButton>
      <IconButton>
        <Star size={"1.25rem"} />
      </IconButton>
      <IconButton>
        <Trash size={"1.25rem"} />
      </IconButton>
    </ButtonGroup>
  );
}
