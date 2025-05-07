<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"
  import update from "immutability-helper"

  import { concat } from "../utils"
  import { type GameCoverId } from "../types"
  import GameAddButton from "./GameAddButton.svelte"
  import GameCover from "./GameCover.svelte"

  export let onSelect: ((src: GameCoverId) => void) | undefined = undefined
  export let onDeselect: ((src: GameCoverId) => void) | undefined = undefined

  let gameCoverActiveIndex: Option<number> = undefined

  type GameCover = {
    src: string,
  }

  let gameCovers: GameCover[] = []
</script>

<div class={concat([
  "flex-none",
  "w-full",
  "h-[127px]",
  "flex",
  "overflow-auto",
])}>
  {#each gameCovers as gameCover, gameCoverIndex }
    <GameCover
      src={gameCover.src}
      active={gameCoverIndex === gameCoverActiveIndex}
      onClick={() => {
        if (gameCoverIndex === gameCoverActiveIndex) {
          gameCoverActiveIndex = undefined
          if (onDeselect) {
            onDeselect(gameCover.src)
          }
        } else {
          gameCoverActiveIndex = gameCoverIndex
          if (onSelect) {
            onSelect(gameCover.src)
          }
        }
      }}
    />
  {/each}
  <div>
    <GameAddButton onChange={src => {
      gameCovers = update(gameCovers, {
        $push: src.map(src => ({ src }))
      })
    }} />
  </div>
</div>
