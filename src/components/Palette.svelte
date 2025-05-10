<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"
  import update from "immutability-helper"

  import { concat } from "../utils"
  import { type GameCoverId } from "../stores/gameCoverId"
  import { type GameCoverData } from "../stores/gameCoverData"
  import GameAddButton from "./GameAddButton.svelte"
  import GameCover from "./GameCover.svelte"

  export let onSelect: ((src: GameCoverId) => void) | undefined = undefined
  export let onDeselect: ((src: GameCoverId) => void) | undefined = undefined
  export let onGameCoverAdded: Option<((newGameCover: GameCoverData) => void)> = undefined

  let gameCoverActiveIndex: Option<number> = undefined

  let gameCovers: GameCoverData[] = []
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
      data={gameCover}
      active={gameCoverIndex === gameCoverActiveIndex}
      onClick={() => {
        if (gameCoverIndex === gameCoverActiveIndex) {
          gameCoverActiveIndex = undefined
          if (onDeselect) {
            onDeselect(gameCover.id)
          }
        } else {
          gameCoverActiveIndex = gameCoverIndex
          if (onSelect) {
            onSelect(gameCover.id)
          }
        }
      }}
    />
  {/each}
  <div>
    <GameAddButton onChange={files => {
      for (let index = 0; index < files.length; index++) {
        const file = files[index]
        createImageBitmap(file)
          .then(imageBitmap => {
            const newGameCover = {
              id: URL.createObjectURL(file),
              imageBitmap
            }
            gameCovers = update(gameCovers, {
              $push: [newGameCover]
            })
            if (onGameCoverAdded) {
              onGameCoverAdded(newGameCover)
            }
          })
          .catch(errMsg => {
            console.log(`Load "${file.name}" throw error: ${errMsg}`)
          })
      }
    }} />
  </div>
</div>
