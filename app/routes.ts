import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  route("sign-in", "routes/root/sign-in.tsx"),
  route("api/create-trip", "routes/api/create-trip.ts"),
  layout("routes/admin/adminLayout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("users", "routes/admin/userLayout.tsx"),
    route("trips", "routes/admin/trips.tsx"),
    route("trips/create", "routes/admin/createTrip.tsx"),
  ]),
] satisfies RouteConfig;
