import { Outlet, useLocation } from "react-router";
import { PageLayout as PurePageLayout } from "@/layouts/PageLayout";

const PageLayout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const name = pathSegments.pop();
  const kind = pathSegments.pop();

  if (name == null || kind == null) {
    throw new Error("Component not found in routes.");
  }
  if (kind !== "docs" && kind !== "components" && kind !== "utils") {
    throw new Error(`Unknown kind: ${kind}`);
  }

  return (
    <PurePageLayout kind={kind} name={name}>
      <Outlet />
    </PurePageLayout>
  );
};

export default PageLayout;
