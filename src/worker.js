export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const prefix = "/actor";

    if (url.pathname === prefix) {
      url.pathname = `${prefix}/`;
      return Response.redirect(url, 308);
    }

    if (url.pathname.startsWith(`${prefix}/`)) {
      url.pathname = url.pathname.slice(prefix.length) || "/";
    }

    return env.ASSETS.fetch(new Request(url, request));
  },
};
