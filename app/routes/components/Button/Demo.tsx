import { Star } from "lucide-react";
import { Button } from "src/components/Button";

export function Demo() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="xs" leftSection={<Star size="1rem" />}>Oh</Button>
      <Button size="sm">Oh</Button>
      <Button>Hello</Button>
      <Button size="lg" variant="filled">World</Button>
      <Button size="xl">And you</Button>
    </div>
  );
}
