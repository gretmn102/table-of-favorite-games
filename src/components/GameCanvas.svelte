<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"
  import { type CellData } from "../stores/cellData"
  import Cell from "./Cell.svelte"

  export let cells: CellData[]
  export let onClick: Option<(cellIndex: number) => void> = undefined
</script>

<div class={concat([
  "w-full",
  "h-full",
  "py-[24px]",
  "flex",
  "flex-row",
  "flex-wrap",
  "justify-center",
  "gap-x-[50px]",
  "gap-y-[58px]",
  "overflow-y-auto",
])}>
  {#each cells as cell, cellIndex}
    <Cell
      description={cell.description}
      imageSrc={cell.imageSrc}
      onClick={() => {
        if (onClick) {
          onClick(cellIndex)
        }
      }}
    />
  {/each}
</div>
