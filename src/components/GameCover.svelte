<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"
  import { onMount } from "svelte"

  import { concat } from "../utils"
  import type { GameCoverData } from "../types"

  export let data: GameCoverData
  export let alt = undefined
  export let active = false
  export let onClick: Option<() => void> = undefined

  let canvas: HTMLCanvasElement

  onMount(() => {
    const ctx = e.currentTarget.getContext("2d")
    ctx?.drawImage(data.imageBitmap, 0, 0)
  })
</script>

<button
  class={concat([
    "flex-none",
    "h-full",
    active ? "border-2" : "",
    "border-black",
    "overflow-auto",
  ])}
  on:click={e => {
    if (onClick) { onClick() }
  }}
>
  <!-- src={data.id} -->
  <!-- style="width: {data.imageBitmap.width}px;" -->
  <canvas
    class={concat([
      "object-contain",
      // `w-[${}px]`,
      // `h-[${data.imageBitmap.height}px]`,
    ])}
    bind:this={canvas}
    on:resize={e => {

      // const ctx = e.currentTarget.getContext("2d")
      // ctx?.drawImage(data.imageBitmap, 0, 0)
    }}
    on:click={e => {
      // e.currentTarget
    }}
    on:load={e => {
      console.log("load")

      // // canvas.currentTarget.context
      // ctx?.save
    }}
    on:loadstart={e => {
      console.log("load start")
    }}
  >
</button>
