import { Input } from "src/components/Input";

export function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input size="sm" placeholder="Type something..." />
      <Input placeholder="Type something..." />
      <Input size="lg" placeholder="Type something..." />
    </div>
  );
}
