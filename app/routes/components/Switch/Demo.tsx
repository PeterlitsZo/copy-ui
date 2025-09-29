import { useState } from "react";

import { Switch } from "src/components/Switch";

export function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Switch size="sm" value={checked} onChange={setChecked} />
      <Switch size="md" value={checked} onChange={setChecked} />
      <Switch size="lg" value={checked} onChange={setChecked} />
    </div>
  );
}