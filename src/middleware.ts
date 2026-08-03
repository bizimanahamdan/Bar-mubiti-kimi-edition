import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: { signIn: "/admin/login" },
})

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/business",
    "/api/hours",
    "/api/menu/:path*",
    "/api/gallery",
    "/api/reviews",
    "/api/reservations",
    "/api/contact",
    "/api/upload",
  ],
}
