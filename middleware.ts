import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
  matcher: ["/tasks/:path*", "/workreports/:path*", "/workouts/:path*", "/notes/:path*", "/payments/:path*"],
};