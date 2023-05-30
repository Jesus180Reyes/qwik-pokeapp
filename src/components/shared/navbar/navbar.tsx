import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../../icons/qwik";
import styles from "./navbar.module.css";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/">
            <QwikLogo height={50} width={143} />
          </Link>
        </div>
        <ul>
          <li>
            <a
              href="https://qwik.builder.io/docs/components/overview/"
              target="_blank"
            >
              Documentacion
            </a>
          </li>
          <li>
            <a
              href="https://qwik.builder.io/examples/introduction/hello-world/"
              target="_blank"
            >
              Ejemplos
            </a>
          </li>
          <li>
            <Link href="/auth/login/">Login</Link>
          </li>
          <li>
            <Link href="/pokemons/list-ssr?offset=10">SSR</Link>
          </li>
          <li>
            <Link href="/pokemons/list-client/">Client</Link>
          </li>
          <li>
            <Link href="/counter/">Counter</Link>
          </li>
          <li>
            <Link href="/dashboard/">Dashboard</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});
