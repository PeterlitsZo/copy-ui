import { useState } from "react";

import { useToast } from "src/components/Toast";
import { Button } from "src/components/Button";

export function Demo() {
  const { addToast } = useToast();
  const [counter, setCounter] = useState(1);

  const handleAddToast = () => {
    addToast(`Toast message ${counter}`);
    setCounter(counter + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button onClick={handleAddToast}>
        Add Toast
      </Button>
    </div>
  );
}