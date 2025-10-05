import { Search } from "lucide-react";
import { Input } from "src/components/Input";
import { useTheme } from "@/components/ThemeProvider";

export function Demo() {
  const theme = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Input
        leftSection={<Search color={theme.colors.gray["600"]} size="60%" />}
        size="sm"
        placeholder="Search..."
      />
      <Input placeholder="Type something..." />
      <Input rightSection={<span>$</span>} size="lg" placeholder="1,000,000" />
    </div>
  );
}
