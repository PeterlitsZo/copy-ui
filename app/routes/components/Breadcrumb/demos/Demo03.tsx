import { ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

const Sep = () => (
  <Breadcrumb.Sep>
    <ChevronRight />
  </Breadcrumb.Sep>
);

export default function Demo() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Sep />
      <Breadcrumb.Item>Components</Breadcrumb.Item>
      <Sep />
      <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  );
}
