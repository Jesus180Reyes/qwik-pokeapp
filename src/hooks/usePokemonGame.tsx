import { useComputed$, useContext, $ } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if (pokemonGame.id + value <= 0) return;
    pokemonGame.id += value;
  });
  const changePokemonPosition = $(() => {
    pokemonGame.isFront = !pokemonGame.isFront;
  });
  return {
    pokemonGame: useComputed$(() => pokemonGame),
    changePokemonId,
    changePokemonPosition,
  };
};
