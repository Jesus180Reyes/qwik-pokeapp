import {
  $,
  component$,
  useContext,
  useOnDocument,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getSmallPokemon } from "~/helpers/getSmallPokemon";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { PokemonListContext } from "~/context/pokemon/pokemon-list-context";
// interface PokemonPageState {
//   currentPage: number;
//   isLoading: boolean;
//   pokemons: SmallPokemon[];
// }
export default component$(() => {
  // const pokemonState = useStore<PokemonPageState>({
  //   currentPage: 0,
  //   pokemons: [],
  //   isLoading: false,
  // });
  const pokemonState = useContext(PokemonListContext);
  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);
  //   const pokemon = await getSmallPokemon(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemon];
  // });
  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    // pokemonState.isLoading = true;
    console.log("Desde el server");
    const pokemon = await getSmallPokemon(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemon];
    pokemonState.isLoading = false;
  });

  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    })
  );

  return (
    <>
      <span>Pagina Actual {pokemonState.currentPage}</span>
      <span>Esta cargando</span>
      <span>Pagina actual</span>

      <div class="mt-10">
        <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </button>
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </button>
      </div>
      <div class="grid md:grid-cols-5 sm:grid-cols-2 xl:grid-cols-7 mt-5">
        {pokemonState.pokemons.map(({ name, id }, i) => {
          return (
            <div
              key={i}
              class="m-5 flex-col justify-center items-center text-center"
            >
              <PokemonImage id={id} isFront={true} isNotRevealed={false} />
              <span class="capitalize ">{name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
});
export const head: DocumentHead = {
  title: "List Client",
};
