import {
  component$,
  useStore,
  useStylesScoped$,
  $,
  useComputed$,
} from "@builder.io/qwik";

import styles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const formState = useStore({
    email: "",
    password: "",
    formPosted: false,
  });

  const emailError = useComputed$(() => {
    if (formState.email.includes("@")) return;
    return "not-valid";
  });
  const passwordError = useComputed$(() => {
    if (formState.password.length >= 6) return;
    return "not-valid";
  });

  const isFormValid = useComputed$(() => {
    if (
      emailError.value === "not-valid" ||
      passwordError.value === "not-valid"
    ) {
      return true;
    }

    return false;
  });

  const onSubmit = $(() => {
    formState.formPosted = true;
    const { email, password } = formState;
    console.log({ email, password });
  });
  return (
    <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
      <div class="relative">
        <input
          onInput$={(e) =>
            (formState.email = (e.target as HTMLInputElement).value)
          }
          class={formState.formPosted ? emailError.value : ""}
          name="email"
          value={formState.email}
          type="text"
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          onInput$={(e) =>
            (formState.password = (e.target as HTMLInputElement).value)
          }
          id="password"
          name="password"
          type="password"
          class={formState.formPosted ? passwordError : ""}
          value={formState.password}
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button disabled={isFormValid.value} type="submit">
          Ingresar
        </button>
      </div>

      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});
