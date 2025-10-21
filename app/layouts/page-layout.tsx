import { Outlet, useLocation, useOutletContext } from "react-router";
import { PageLayout as PurePageLayout } from "@/layouts/PageLayout";

const PageLayout = () => {
  const location = useLocation();
  const context = useOutletContext<{
    componentsRoutes: { name: string; path: string }[];
  }>();
  const componentRoute = context.componentsRoutes.find(
    (route) => route.name === location.pathname.split("/").pop(),
  );
  if (!componentRoute) {
    throw new Error("Component not found in routes.");
  }

  return (
    <PurePageLayout kind="components" name={componentRoute.name}>
      <Outlet />
    </PurePageLayout>
  );
};

export default PageLayout;
