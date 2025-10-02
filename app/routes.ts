import type { RouteConfig } from "@react-router/dev/routes";
import { index, prefix, route } from "@react-router/dev/routes";

import { componentsRoutes } from "./components_routes.codegen";

export default [
  index("routes/home.tsx"),

  ...prefix(
    "v0/components",
    componentsRoutes.map((componentsRoute) => {
      return route(componentsRoute.name, componentsRoute.path);
    }),
  ),
] satisfies RouteConfig;
