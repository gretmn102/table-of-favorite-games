<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"
  import { type GameCoverData } from "../stores/gameCoverData"

  export let data: GameCoverData
  export let alt = undefined
  export let active = false
  export let onClick: Option<() => void> = undefined
  export let onDrag: Option<() => void> = undefined
  export let onDragEnd: Option<() => void> = undefined
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
  on:drag={_ => {
    if (onDrag) { onDrag() }
  }}
  on:dragend={_ => {
    if (onDragEnd) { onDragEnd() }
  }}
  draggable
>
  <img
    class={concat([
      "object-contain",
      "size-full",
    ])}
    src={data.id}
    alt={alt}
  >
</button>
