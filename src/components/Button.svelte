<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"

  export let onClick: Option<() => void> = undefined
</script>

<button
  class={concat([
    "py-1.5",
    "px-11",
    "bg-[#10A337]",
    "rounded",
    "flex",
    "justify-center",
    "items-center",
  ])}
  on:click={_ => {
    if (onClick) { onClick() }
  }}
>
  <div class={concat([
    "font-inter",
    "font-normal",
    "text-xl",
    "text-[#FFFFFF]",
  ])}>
    <slot />
  </div>
</button>
