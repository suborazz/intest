import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const ROLE_ROUTE_MAP: Record<string, string> = {
  "/student": "STUDENT",
  "/institute": "INSTITUTE",
  "/instructor": "INSTRUCTOR",
  "/instructors": "INSTRUCTOR",
  "/immersion/": "IMMERSION_USER",
      "/recruit": "RECRUIT_USER",
  "/super-admin": "SUPER_ADMIN",
};

const PROTECTED_API_ROUTES = [
  "/api/v1/users",
  "/api/v1/profile",
  "/api/v1/auth/me",
  "/api/v1/auth/change-password",
  "/api/v1/auth/logout",
  "/api/v1/payments",
  "/api/v1/enrollments",
];

const PUBLIC_API_ROUTES = [
  "/api/health",
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/docs",
  "/docs",
  "/api/v1/recruit-user/register",
  "/api/v1/recruit-user/login",
  "/api/v1/immersion-participant/register",
  "/api/v1/visitors",
  "/api/v1/contact",
];

function isProtectedApiRoute(pathname: string, method: string): boolean {
  if (pathname === "/api/v1/payments/webhook") {
    return false;
  }
  if (
    pathname.startsWith("/api/v1/internships/") &&
    pathname.endsWith("/interest") &&
    method === "POST"
  ) {
    return false;
  }
  if (
    pathname.startsWith("/api/v1/partners/") &&
    pathname.endsWith("/interest") &&
    method === "POST"
  ) {
    return false;
  }
  if (pathname.startsWith("/api/v1/partners/interests")) {
    return true;
  }
  if (
    pathname.startsWith("/api/v1/partners") &&
    ["POST", "PATCH", "DELETE"].includes(method)
  ) {
    return true;
  }
  if (
    pathname.startsWith("/api/v1/internships") &&
    ["POST", "PATCH", "DELETE"].includes(method)
  ) {
    return true;
  }
  if (
    pathname.startsWith("/api/v1/job-opportunities") &&
    ["POST", "PATCH", "DELETE"].includes(method)
  ) {
    return true;
  }
  if (pathname.startsWith("/api/v1/job-applications")) {
    return true;
  }
  if (
    pathname.startsWith("/api/v1/media") &&
    ["POST", "PATCH", "DELETE"].includes(method)
  ) {
    return true;
  }
  if (
    pathname.startsWith("/api/v1/blogs") &&
    ["POST", "PATCH", "DELETE"].includes(method)
  ) {
    return true;
  }
  if (pathname.startsWith("/api/v1/reviews/pending")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/donations/admin")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/reviews/my-reviews")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/reviews") && pathname.includes("/approve")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/reviews") && method === "DELETE") {
    return true;
  }
  if (
    pathname.startsWith("/api/v1/internships/") &&
    pathname.endsWith("/interests")
  ) {
    return true;
  }
  if (pathname.includes("/apply")) {
    return true;
  }
  if (
    pathname.includes("/applications") &&
    !pathname.includes("/my-applications")
  ) {
    return true;
  }
  if (pathname.startsWith("/api/v1/internships/applications/my-applications")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/internships/pending")) {
    return true;
  }
  if (
    pathname.includes("/complete") ||
    pathname.includes("/issue-certificate")
  ) {
    return true;
  }
  if (pathname.startsWith("/api/v1/certificates/my-certificates")) {
    return true;
  }
  if (
    pathname.startsWith("/api/v1/certificates/") &&
    (pathname.endsWith("/download") || pathname.endsWith("/grade"))
  ) {
    return true;
  }
  if (pathname.startsWith("/api/v1/recruit-user")) {
    return true;
  }
  if (pathname.includes("/id-card")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/student/dashboard")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/student/register")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/instructor/register")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/feedback")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/tickets")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/notices")) {
    if (method === "GET") {
      return false;
    }
    return true;
  }
  if (pathname.startsWith("/api/v1/immersion")) {
    if (
      (pathname === "/api/v1/immersion" || /^\/api\/v1\/immersion\/[^/]+$/.test(pathname)) &&
      method === "GET"
    ) {
      return false;
    }
    return true;
  }
  if (pathname.startsWith("/api/v1/instructor")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/immersion-participant")) {
    return true;
  }
  if (pathname.startsWith("/api/v1/payments")) {
    return true;
  }
  return PROTECTED_API_ROUTES.some((route) => pathname.startsWith(route));
}

const EXTERNAL_CALLER_ROUTES = [
  "/api/v1/payments/webhook",
  "/api/health",
  "/api/docs",
  "/api/v1/visitors",
];

const SPOOFABLE_IDENTITY_HEADERS = ["x-user-id", "x-user-email", "x-user-role"];

function getAllowedOrigins(request: NextRequest): string[] {
  const configured = (process.env["ALLOWED_ORIGINS"] ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const origins = new Set<string>();
  origins.add(request.nextUrl.origin);

    const proto = request.headers.get("x-forwarded-proto") || "http";
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (host) {
    origins.add(`${proto}://${host}`);
  }

  configured.forEach((o) => origins.add(o));

  return [...origins];
}

function isAllowedOrigin(request: NextRequest, origin: string | null): boolean {
  if (!origin) return false;
  return getAllowedOrigins(request).includes(origin);
}

function isSameAppRequest(request: NextRequest): boolean {
  const { pathname } = request.nextUrl;

  if (EXTERNAL_CALLER_ROUTES.some((route) => pathname.startsWith(route))) {
    return true;
  }

      const internalSecret = process.env["INTERNAL_API_SECRET"];
  if (
    internalSecret &&
    request.headers.get("x-internal-api-secret") === internalSecret
  ) {
    return true;
  }

  const origin = request.headers.get("origin");
  if (origin) {
        return isAllowedOrigin(request, origin);
  }

    const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite) {
    return secFetchSite === "same-origin" || secFetchSite === "same-site";
  }

      const referer = request.headers.get("referer");
  if (referer) {
    try {
      return isAllowedOrigin(request, new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return false;
}

function buildCorsHeaders(
  request: NextRequest,
  origin: string | null,
): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Request-ID",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };

      if (isAllowedOrigin(request, origin) && origin) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

    const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-current-path", pathname);

    if (pathname.startsWith("/api")) {
    const origin = request.headers.get("origin");
    const corsHeaders = buildCorsHeaders(request, origin);

        for (const header of SPOOFABLE_IDENTITY_HEADERS) {
      requestHeaders.delete(header);
    }

        if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers: corsHeaders });
    }

        if (!isSameAppRequest(request)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "This API is not publicly accessible.",
          },
        },
        { status: 403, headers: corsHeaders },
      );
    }

        if (PUBLIC_API_ROUTES.some((r) => pathname.startsWith(r))) {
      const response = NextResponse.next({
        request: { headers: requestHeaders },
      });
      Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      return response;
    }

    const isProtected = isProtectedApiRoute(pathname, request.method);
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    if (!token && isProtected) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Authentication required" },
        },
        { status: 401, headers: corsHeaders },
      );
    }

    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env["JWT_SECRET"] ?? "",
        );
        const { payload } = await jwtVerify(token, secret);

        requestHeaders.set("X-User-Id", String(payload["sub"] ?? ""));
        requestHeaders.set("X-User-Email", String(payload["email"] ?? ""));
        requestHeaders.set("X-User-Role", String(payload["role"] ?? "STUDENT"));
      } catch {
        if (isProtected) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: "INVALID_TOKEN",
                message: "Token is invalid or expired",
              },
            },
            { status: 401, headers: corsHeaders },
          );
        }
      }
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

    try {
    const token = request.cookies.get("access_token")?.value;
    const userRole = request.cookies.get("user_role")?.value?.toUpperCase();

        let matchedRoutePrefix = Object.keys(ROLE_ROUTE_MAP).find((prefix) => {
      const cleanPrefix = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
      return pathname === cleanPrefix || pathname.startsWith(cleanPrefix + "/");
    });

        if (matchedRoutePrefix === "/immersion/") {
      const dashboardSubpaths = [
        "/immersion/dashboard",
        "/immersion/profile",
        "/immersion/application",
        "/immersion/certificates",
        "/immersion/id-card",
        "/immersion/notifications",
        "/immersion/payments",
        "/immersion/programs",
        "/immersion/reviews",
        "/immersion/settings",
        "/immersion/support",
      ];
      const isDashboardPath = dashboardSubpaths.some((sub) =>
        pathname.startsWith(sub),
      );
      if (!isDashboardPath) {
        matchedRoutePrefix = undefined; 
      }
    }

    if (matchedRoutePrefix) {
      const requiredRole = ROLE_ROUTE_MAP[matchedRoutePrefix];

            if (!token) {
        if (pathname.includes("/registration")) {
          const roleQuery = requiredRole ? `?role=${requiredRole}` : "";
          return createRedirectResponse(`/sign-up${roleQuery}`, request.url, requestHeaders);
        }
        return createRedirectResponse("/login", request.url, requestHeaders);
      }

            const isAllowedRole =
        userRole === requiredRole ||
        (requiredRole === "IMMERSION_USER" &&
          (userRole === "IMMERSION" ||
            userRole === "IMMERSION_USER" ||
            userRole === "STUDENT")) ||
        (requiredRole === "STUDENT" &&
          (userRole === "STUDENT" ||
            userRole === "IMMERSION_USER" ||
            userRole === "IMMERSION"));

      if (!isAllowedRole) {
        return createRedirectResponse("/login", request.url, requestHeaders);
      }
    }

        return applySecurityHeaders(
      NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      }),
    );
  } catch (error) {
        console.error("[Middleware Exception Catch-All]:", error);
    return createRedirectResponse("/login", request.url, requestHeaders);
  }
}

function createRedirectResponse(
  targetPath: string,
  requestUrl: string,
  headers: Headers,
) {
  const redirectUrl = new URL(targetPath, requestUrl);
  const response = NextResponse.redirect(redirectUrl);

    headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return applySecurityHeaders(response);
}

function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  return response;
}

export const config = {
  matcher: [
        "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
