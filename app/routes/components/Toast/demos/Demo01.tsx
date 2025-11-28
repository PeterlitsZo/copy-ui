import { useState } from "react";

import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";

export default function Demo() {
  const { addToast } = useToast();
  const [counter, setCounter] = useState(1);

  const handleAddToast = () => {
    const type = (["default", "success", "info", "warning", "error"] as const)[
      Math.floor(Math.random() * 5)
    ];
    addToast({
      type,
      message: `This is toast message ${counter}`,
      description: "You can send more toasts, if you like.",
    });
    setCounter(counter + 1);
  };

  return <Button onClick={handleAddToast}>Add Toast</Button>;
}
