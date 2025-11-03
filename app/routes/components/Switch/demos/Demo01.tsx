import { useState } from "react";

import { Switch } from "@/components/Switch";

export default function Demo() {
  const [checked, setChecked] = useState(false);

  return <Switch size="md" value={checked} onChange={setChecked} />;
}
