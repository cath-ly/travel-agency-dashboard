import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: "https://7ef7d5ab5e1dba0d15a29da34f421a41@o4509429890613248.ingest.us.sentry.io/4509429891989504",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
