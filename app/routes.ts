import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@react-router/dev/routes";

export default [
  route("sign-in", "routes/root/signIn.tsx"),
  route("api/create-trip", "routes/api/createTrip.ts"),
  layout("routes/admin/adminLayout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("users", "routes/admin/userLayout.tsx"),
    route("trips", "routes/admin/trips.tsx"),
    route("trips/create", "routes/admin/createTrip.tsx"),
    route("trips/:tripID", "routes/admin/tripDetail.tsx"),
  ]),
  layout("routes/root/pageLayout.tsx", [index("routes/root/travelPage.tsx")]),
] satisfies RouteConfig;
