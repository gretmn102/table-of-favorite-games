<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "./lib/utils"
  import { type GameCoverId } from "./stores/gameCoverId"
  import CellData from "./stores/cellData"
  import CellStorage from "./stores/cellStorage"
  import GameCoverStorage from "./stores/gameCoverStorage"
  import NavBar from "./components/NavBar.svelte"
  import Palette from "./components/Palette.svelte"
  import GameCanvas from "./components/GameCanvas.svelte"
  import Button from "./components/Button.svelte"
  import { CellParams, OutputImage, Table } from "./lib/table"
  import { download } from "./lib/fileInputOutput";

  let gameCoverActive: Option<GameCoverId> = undefined
  let gameCoverDraged: Option<GameCoverId> = undefined
  let cells: CellStorage = CellStorage.create()
  let gameCoverStorage = GameCoverStorage.create()
</script>

<main>
  <div class={concat([
    "flex",
    "justify-center",
  ])}>
    <div class={concat([
      "relative", // for children with absolute
      "w-full",
      "h-dvh",
      "h-[calc(var(--vh,_1vh)_*_100)]",
      "bg-[#e5e5e5]",
      "flex",
      "flex-col",
    ])}>
      <NavBar />
      <div class={concat([
        "size-full",
        "px-[4px]",
        "flex",
        "flex-col",
        "items-center",
        "gap-[2px]",
        "overflow-y-auto",
      ])}>
        <Palette
          onSelect={gameCoverId => {
            gameCoverActive = gameCoverId
          }}
          onDeselect={gameCoverId => {
            gameCoverActive = undefined
          }}
          onGameCoverAdded={newGameCover => {
            gameCoverStorage = GameCoverStorage.add(gameCoverStorage, newGameCover)
          }}
          onDrag={gameCoverId => {
            gameCoverDraged = gameCoverId
          }}
          onDragEnd={gameCoverId => {
            gameCoverDraged = undefined
          }}
        />
        <div class={concat([
          "flex-grow",
          "overflow-y-auto",
        ])}>
          <GameCanvas
            cells={cells}
            onClick={cellIndex => {
              if (gameCoverActive) {
                cells = CellStorage.updateCell(
                  cells,
                  cellIndex,
                  cell => {
                    return CellData.updateImageSrc(cell, _ => gameCoverActive)
                  }
                )
              } else {
                cells = CellStorage.updateCell(
                  cells,
                  cellIndex,
                  cell => {
                    return CellData.updateImageSrc(cell, _ => undefined)
                  }
                )
              }
            }}
          onDrop={cellIndex => {
            if (!gameCoverDraged) { return }
            cells = CellStorage.updateCell(
              cells,
              cellIndex,
              cell => {
                return CellData.updateImageSrc(cell, _ => gameCoverDraged)
              }
            )
          }}
          />
        </div>
        <div class={concat([
          "shrink-0",
          "w-full",
          "h-[72px]",
          "flex",
          "justify-center",
          "items-center",
        ])}>
          <Button onClick={() => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            if (!ctx) { return }
            const outputImage = OutputImage.create(ctx, cells)
            canvas.width = outputImage.size.width
            canvas.height = outputImage.size.height
            OutputImage.draw(outputImage, ctx, gameCoverStorage)
            canvas.toBlob(blob => {
              if (blob) {
                download(blob, "table-of-favorite-game.png")
                // todo: perf(output): remove canvas after all
              }
            })
          }}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  </div>
</main>
