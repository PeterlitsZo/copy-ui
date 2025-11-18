import { TreeSelect } from "@/components/TreeSelect";

export default function Demo() {
  return (
    <TreeSelect
      options={[
        {
          label: "Option 1",
          children: [
            {
              label: "Option 1.1",
              children: [
                { value: "1.1.1", label: "Option 1.1.1" },
                { value: "1.1.2", label: "Option 1.1.2" },
              ],
            },
          ],
        },
        {
          label: "Option 2",
          children: [
            { value: "2.1", label: "Option 2.1" },
            { value: "2.2", label: "Option 2.2" },
          ],
        },
      ]}
    />
  );
}
