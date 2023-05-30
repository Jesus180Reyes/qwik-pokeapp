import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number | string;
  isFront: boolean;
  isNotRevealed: boolean;
}
export const PokemonImage = component$(
  ({ id, isFront = true, isNotRevealed = true }: Props) => {
    const imageLoader = useSignal<boolean>(false);
    useTask$(({ track }) => {
      track(() => id);
      imageLoader.value = false;
    });

    return (
      <>
        {!imageLoader.value && <span>Caragando...</span>}

        <img
          src={
            isFront
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
              : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
          }
          alt="Imagen pokemon"
          width={200}
          height={500}
          onLoad$={() => (imageLoader.value = true)}
          class={[
            {
              hidden: !imageLoader.value,
              "brightness-0": isNotRevealed,
            },
            "transition-all",
            "cursor-pointer",
          ]}
        />
      </>
    );
  }
);
