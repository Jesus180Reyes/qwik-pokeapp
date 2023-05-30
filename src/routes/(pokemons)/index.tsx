import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
// import { useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { Modal } from "~/components/shared";
import { usePokemonGame } from "~/hooks/usePokemonGame";

export default component$(() => {
  const { changePokemonId, pokemonGame, changePokemonPosition } =
    usePokemonGame();
  const modalVissible = useSignal<boolean>(false);
  // const pokemonId = useSignal<number>(1);
  // const isFront = useSignal<boolean>(true);
  // const isNotRevealed = useSignal<boolean>(true);
  // const navigate = useNavigate();

  const modalPokemon = useStore({
    id: "",
    name: "",
  });
  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVissible.value = true;
  });

  const closeModal = $(() => {
    modalVissible.value = false;
  });

  // const goToPokemonPage = $(() => {
  //   navigate(`/pokemons/${pokemonGame.value.id}`);
  // });
  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonGame.value.id}</span>
      <div onClick$={() => showModal(pokemonGame.value.id.toString(), "")}>
        <PokemonImage
          id={pokemonGame.value.id}
          isFront={pokemonGame.value.isFront}
          isNotRevealed={pokemonGame.value.isNotRevealed}
        />
      </div>
      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary">
          Anterior
        </button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary">
          Siguientes
        </button>
        <button onClick$={changePokemonPosition} class="btn btn-primary">
          Voltear
        </button>
        <button
          onClick$={() =>
            (pokemonGame.value.isNotRevealed = !pokemonGame.value.isNotRevealed)
          }
          class="btn btn-primary"
        >
          Revelar
        </button>
      </div>
      <Modal showModal={modalVissible.value} closeModal={closeModal} persistent>
        <div q:slot="title">Hola mundo</div>
        <div q:slot="content">
          <PokemonImage
            id={pokemonGame.value.id}
            isFront
            isNotRevealed={false}
          />
          <span>Preguntandole CHATGPT</span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "Hola mundo",
  meta: [
    {
      name: "Esto es Hola mundo",
      content: "Sexo anal",
    },
  ],
};
