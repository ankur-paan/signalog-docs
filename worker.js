// Cloudflare Worker entry — serves the VitePress build via the static-assets
// binding. The Worker is intentionally tiny: 99% of requests are handled by the
// ASSETS binding directly. The remaining logic is for security headers and
// custom 404 responses.

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)

    // Clone so we can add headers without breaking the immutable Response.
    const headers = new Headers(response.headers)

    // Security headers — applied to every response.
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('X-Frame-Options', 'SAMEORIGIN')
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    headers.set('Permissions-Policy', 'interest-cohort=()')

    // Long-cache static assets, short-cache HTML.
    const url = new URL(request.url)
    if (
      url.pathname.startsWith('/assets/') ||
      url.pathname.match(/\.(?:js|css|woff2?|svg|png|jpg|jpeg|gif|webp|ico)$/)
    ) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    } else if (url.pathname.endsWith('.html') || !url.pathname.includes('.')) {
      headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600')
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
}
