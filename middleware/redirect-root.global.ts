export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    return navigateTo('/jokes', { redirectCode: 301 });
  }
});
