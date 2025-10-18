import { Breadcrumb } from "@/components/Breadcrumb";

export default function Demo() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Sep />
      <Breadcrumb.Item>Components</Breadcrumb.Item>
      <Breadcrumb.Sep />
      <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  );
}
