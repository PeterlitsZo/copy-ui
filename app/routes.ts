import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, prefix, route } from "@react-router/dev/routes";

import { componentsRoutes } from "./components-routes.codegen";
import { utilsRoutes } from "./utils-routes.codegen";

export default [
  index("routes/home.tsx"),

  layout("./layouts/page-layout.tsx", [
    ...prefix("v0/react/docs", [
      route("get-started", "routes/docs/get-started/index.tsx"),
      route("colors", "routes/docs/colors/index.tsx"),
    ]),
    ...prefix(
      "v0/react/components",
      componentsRoutes.map((componentsRoute) => {
        return route(componentsRoute.name, componentsRoute.path);
      }),
    ),
    ...prefix(
      "v0/react/utils",
      utilsRoutes.map((utilsRoute) => {
        return route(utilsRoute.name, utilsRoute.path);
      }),
    ),
  ]),
] satisfies RouteConfig;
