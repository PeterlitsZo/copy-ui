import { Trash } from "lucide-react";

import { IconButton } from "src/components/IconButton";

export function Demo() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <IconButton size="sm">
        <Trash size={'60%'} />
      </IconButton>
      <IconButton>
        <Trash size={'60%'} />
      </IconButton>
      <IconButton size="lg" variant="filled">
        <Trash size={'60%'} />
      </IconButton>
    </div>
  );
}
