import { component$, useComputed$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { getSmallPokemon } from "~/helpers/getSmallPokemon";
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, pathname, redirect }) => {
    const offset = Number(query.get("offset") || "10");
    const limit = Number(query.get("limit") || "0");
    if (isNaN(offset)) redirect(301, pathname);
    if (offset < 0) redirect(301, pathname);
    return await getSmallPokemon(offset, limit);
  }
);

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();
  const currentOffset = useComputed$(() => {
    const offset = location.url.searchParams.get("offset");
    return Number(offset);
  });
  return (
    <>
      <span>Current Offset {currentOffset}</span>
      <span>Is Cargando pagina {location.isNavigating ? "Si" : "NO"}</span>
      <span>Pagina actual</span>

      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${
            currentOffset.value - 10
          }&limit=10`}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${
            currentOffset.value + 10
          }&limit=10`}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </Link>
      </div>
      <div class="grid grid-cols-5 mt-5">
        {pokemons.value.map(({ name, id }) => {
          return (
            <div
              key={name}
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
  title: "List SSR",
};
