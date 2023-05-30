import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwtCookie = cookie.get("jwt");
  if (jwtCookie) {
    console.log("cookie value ", jwtCookie);
    return;
  }
  redirect(302, "/auth/login");
});
export default component$(() => {
  return (
    <>
      <h3>Dashboard Layout</h3>
      <Slot />
    </>
  );
});
