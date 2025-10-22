import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, prefix, route } from "@react-router/dev/routes";

import { componentsRoutes } from "./components_routes.codegen";
import { utilsRoutes } from "./utils-routes.codegen";

const nextComponentNames = ["Card", "Paper", "Typography", "Tooltip", "Tag"];

export default [
  index("routes/home.tsx"),

  ...prefix("v0/docs", [route("get-started", "routes/docs/get-started.tsx")]),
  ...prefix(
    "v0/utils",
    utilsRoutes.map((utilsRoute) => {
      return route(utilsRoute.name, utilsRoute.path);
    }),
  ),
  ...prefix(
    "v0/components",
    componentsRoutes
      .filter(
        (componentsRoute) =>
          nextComponentNames.indexOf(componentsRoute.name) === -1,
      )
      .map((componentsRoute) => {
        return route(componentsRoute.name, componentsRoute.path);
      }),
  ),

  layout(
    "./layouts/page-layout.tsx",
    prefix(
      "v0/components",
      componentsRoutes
        .filter(
          (componentsRoute) =>
            nextComponentNames.indexOf(componentsRoute.name) !== -1,
        )
        .map((componentsRoute) => {
          return route(componentsRoute.name, componentsRoute.path);
        }),
    ),
  ),
] satisfies RouteConfig;
