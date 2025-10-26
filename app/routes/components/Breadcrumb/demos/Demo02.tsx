import { Breadcrumb } from "@/components/Breadcrumb";
import { Flex } from "@/components/Flex";

export default function Demo() {
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <Flex dir="column" gap="1rem">
      {sizes.map((size) => (
        <Breadcrumb size={size} key={size}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Sep />
          <Breadcrumb.Item>Components</Breadcrumb.Item>
          <Breadcrumb.Sep />
          <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
        </Breadcrumb>
      ))}
    </Flex>
  );
}
