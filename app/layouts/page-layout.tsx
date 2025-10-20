import { Outlet, useLocation, useOutletContext } from "react-router";
import { ComponentTemplate } from "@/components/ComponentTemplate";

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
    <ComponentTemplate component={componentRoute.name}>
      <Outlet />
    </ComponentTemplate>
  );
};

export default PageLayout;
