export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/') {
    return navigateTo('/jokes', { redirectCode: 301 });
  }

  return navigateTo(from, { redirectCode: 301 });
});
