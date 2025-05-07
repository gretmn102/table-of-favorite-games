<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "../utils"

  export let src: string
  export let alt = undefined
  export let active = false
  export let onClick: Option<() => void> = undefined
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
  <img
    class={concat([
      "object-contain",
      "size-full",
    ])}
    src={src}
    alt={alt}
  >
</button>
