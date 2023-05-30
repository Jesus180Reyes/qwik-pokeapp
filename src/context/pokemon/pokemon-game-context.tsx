import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState {
  id: number;
  isFront: boolean;
  isNotRevealed: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>(
  "pokemon.game-context"
);
