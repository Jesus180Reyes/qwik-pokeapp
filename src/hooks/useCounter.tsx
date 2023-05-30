import { $, useSignal, useComputed$ } from "@builder.io/qwik";
export const useCounter = (initialValue: number) => {
  const counter = useSignal<number>(initialValue);

  const incrementCounter = $(() => {
    counter.value++;
  });
  const decrementCounter = $(() => {
    counter.value--;
  });
  return {
    // * Propiedades
    counter: useComputed$(() => counter.value),
    // * Metodos
    incrementCounter,
    decrementCounter,
  };
};
