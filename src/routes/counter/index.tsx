import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useCounter } from "~/hooks/useCounter";

export default component$(() => {
  const { counter, incrementCounter, decrementCounter } = useCounter(10);
  return (
    <>
      <span class="text-2xl text-sm-3xl">Counter</span>
      <span>{counter.value}</span>
      <div class="mt-2">
        <button onClick$={incrementCounter} class="btn btn-primary mr-2">
          +1
        </button>
        <button onClick$={decrementCounter} class="btn btn-primary ml-2">
          -1
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Counter Page",
};
