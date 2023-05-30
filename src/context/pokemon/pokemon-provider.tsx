import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { PokemonListState } from "./pokemon-list-context";
import { PokemonListContext } from "./pokemon-list-context";
import type { PokemonGameState } from "./pokemon-game-context";
import { PokemonGameContext } from "./pokemon-game-context";

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    id: 1,
    isNotRevealed: true,
    isFront: true,
  });
  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  });

  useVisibleTask$(() => {
    if (localStorage.getItem("pokemon_game")) {
      const { id, isFront, isNotRevealed } = JSON.parse(
        localStorage.getItem("pokemon_game")!
      ) as PokemonGameState;

      pokemonGame.id = id;
      pokemonGame.isFront = isFront;
      pokemonGame.isNotRevealed = isNotRevealed;
    }
  });
  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.id,
      pokemonGame.isFront,
      pokemonGame.isNotRevealed,
    ]);

    localStorage.setItem("pokemon_game", JSON.stringify(pokemonGame));
  });
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);
  return <Slot />;
});
