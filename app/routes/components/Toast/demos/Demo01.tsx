import { useState } from "react";

import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";

export default function Demo() {
  const { addToast } = useToast();
  const [counter, setCounter] = useState(1);

  const handleAddToast = () => {
    addToast(`Toast message ${counter}`);
    setCounter(counter + 1);
  };

  return <Button onClick={handleAddToast}>Add Toast</Button>;
}
