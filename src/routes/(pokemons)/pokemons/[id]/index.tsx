import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { usePokemonGame } from "~/hooks/usePokemonGame";
export const useRouteLoader = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    redirect(301, "/");
  }
  if (id <= 0) {
    redirect(301, "/");
  }
  if (id > 1000) redirect(301, "/");
  return id;
});

export default component$(() => {
  const { changePokemonPosition, pokemonGame } = usePokemonGame();
  // const { id } = useLocation().params;
  const id = useRouteLoader();
  return (
    <>
      <span class="text-5xl">Pokemon: {id} </span>
      <PokemonImage
        id={id.value}
        isFront={pokemonGame.value.isFront}
        isNotRevealed={pokemonGame.value.isNotRevealed}
      />
      <div>
        <button onClick$={changePokemonPosition} class="btn btn-primary mr-2">
          Voltear
        </button>
        <button
          onClick$={() =>
            (pokemonGame.value.isNotRevealed = !pokemonGame.value.isNotRevealed)
          }
          class="btn btn-primary ml-2"
        >
          Revelar
        </button>
      </div>
    </>
  );
});
export const head: DocumentHead = {
  title: `Pokemon Details`,
};
