import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

import { componentsRoutes } from "./components_routes.codegen";

export default [
  index("routes/home.tsx"),

  ...prefix("components", componentsRoutes.map((componentsRoute) => {
    return route(componentsRoute.name, componentsRoute.path);
  }))
] satisfies RouteConfig;
