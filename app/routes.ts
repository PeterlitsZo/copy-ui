import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("components", [
    route("Button", "routes/components/Button/index.tsx"),
    route("ButtonGroup", "routes/components/ButtonGroup/index.tsx"),
    route("CodeHighlight", "routes/components/CodeHighlight/index.tsx"),
    route("IconButton", "routes/components/IconButton/index.tsx"),
    route("Input", "routes/components/Input/index.tsx"),
    route("Popover", "routes/components/Popover/index.tsx"),
    route("SortIndicator", "routes/components/SortIndicator/index.tsx"),
    route("ThemeProvider", "routes/components/ThemeProvider/index.tsx"),
    route("TimeSelector", "routes/components/TimeSelector/index.tsx"),
  ])
] satisfies RouteConfig;
