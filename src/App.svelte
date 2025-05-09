<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "./utils"
  import { CellData, CellStorage, GameCoverStorage, type GameCoverId } from "./types"
  import NavBar from "./components/NavBar.svelte"
  import Palette from "./components/Palette.svelte"
  import GameCanvas from "./components/GameCanvas.svelte"
  import Button from "./components/Button.svelte"
  import { CellParams, Table } from "./table"

  let gameCoverActive: Option<GameCoverId> = undefined
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
      "max-w-[480px]",
      "h-screen",
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
            const [w, h] = [2048, 1768]
            const canvas = document.createElement("canvas")
            canvas.width = w
            canvas.height = h
            const ctx = canvas.getContext("2d")
            if (!ctx) { return }
            Table.draw({
              cells: cells,
              gapX: 50,
              gapY: 58,
              cellParams: CellParams.create(),
              width: w,
              height: h,
            }, gameCoverStorage, ctx)
            window.open(canvas.toDataURL())
          }}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  </div>
</main>
