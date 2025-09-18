import { Button } from "src/components/Button";

export function Demo() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Oh</Button>
      <Button>Hello</Button>
      <Button size="lg" variant="filled">World</Button>
    </div>
  );
}
