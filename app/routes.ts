import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/admin/adminLayout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("users", "routes/admin/userLayout.tsx"),
  ]),
] satisfies RouteConfig;
