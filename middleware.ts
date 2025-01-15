// import { NextRequest, NextResponse } from "next/server";
// // import { getToken } from "next-auth/jwt";

// export const config = {
//   matcher: [
//     /*
//      * Match all paths except for:
//      * 1. /api routes
//      * 2. /_next (Next.js internals)
//      * 3. /_static (inside /public)
//      * 4. all root files inside /public (e.g. /favicon.ico)
//      */
//     "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
//   ],
// };

// export default async function middleware(req: NextRequest) {
//   const url = req.nextUrl;

//   // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
//   let hostname = req.headers
//     .get("host")!
//     .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

//   // special case for Vercel preview deployment URLs
//   if (
//     hostname.includes("---") &&
//     hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
//   ) {
//     hostname = `${hostname.split("---")[0]}.${
//       process.env.NEXT_PUBLIC_ROOT_DOMAIN
//     }`;
//   }

//   const searchParams = req.nextUrl.searchParams.toString();
//   // Get the pathname of the request (e.g. /, /about, /blog/first-post)
//   const path = `${url.pathname}${
//     searchParams.length > 0 ? `?${searchParams}` : ""
//   }`;

//   // rewrites for app pages
//   if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
//     // const session = await getToken({ req });
//     // if (!session && path !== "/login") {
//     //   return NextResponse.redirect(new URL("/login", req.url));
//     // } else if (session && path == "/login") {
//     //   return NextResponse.redirect(new URL("/", req.url));
//     // }
//     return NextResponse.rewrite(
//       new URL(`/app${path === "/" ? "" : path}`, req.url),
//     );
//   }

//   // special case for `vercel.pub` domain
//   if (hostname === "vercel.pub") {
//     return NextResponse.redirect(
//       "https://vercel.com/blog/platforms-starter-kit",
//     );
//   }

//   // rewrite root application to `/home` folder
//   if (
//     hostname === "localhost:3000" ||
//     hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
//   ) {
//     return NextResponse.rewrite(
//     //   new URL(`/home${path === "/" ? "" : path}`, req.url),
//       new URL(`${path === "/" ? "" : path}`, req.url),
//     );
//   }

//   // rewrite everything else to `/[domain]/[slug] dynamic route
//   return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
// }


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import TenantModel from './app/lib/model.tenant';

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
    ],
};

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    let hostname = req.headers.get("host") || '';

    // Remove port if it exists
    hostname = hostname.split(':')[0];

    // Define allowed domains (including main domain and localhost)
    const allowedDomains = ["siniotech.com.ng","*.siniotech.com.ng", "www.siniotech.com.ng", "multitenantshop.vercel.app", "www.multitenantshop.vercel.app", "localhost"];

    // Check if the current hostname is in the list of allowed domains
    const isMainDomain = allowedDomains.includes(hostname);

    // Extract subdomain if not a main domain
    const subdomain = isMainDomain ? null : hostname.split('.')[0];

    console.log('Middleware: Hostname:', hostname);
    console.log('Middleware: Subdomain:', subdomain);

    // If it's a main domain, allow the request to proceed
    if (isMainDomain) {
        console.log('Middleware: Main domain detected, passing through');
        return NextResponse.next();
    }

    // Handle subdomain logic
    if (subdomain) {
        try {
            // Use fetch to verify if the subdomain exists
            const response = await fetch(`${url.origin}/api/tenant?subdomain=${subdomain}`);

            if (response.ok) {
                console.log('Middleware: Valid subdomain detected, rewriting URL');
                // Rewrite the URL to a dynamic route based on the subdomain
                return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
            }
        } catch (error) {
            console.error('Middleware: Error fetching tenant:', error);
        }
    }

    console.log('Middleware: Invalid subdomain or domain, returning 404');
    // If none of the above conditions are met, return a 404 response
    return new NextResponse(null, { status: 404 });
}