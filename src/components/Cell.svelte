<script lang="ts">
  import { Option } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"

  export let description: string
  export let imageSrc: Option<string>
  export let onClick: Option<() => void> = undefined
  export let onDrop: Option<() => void> = undefined
  export let onDropAllow: Option<() => boolean> = undefined
</script>

<button
  class={concat([
    "flex",
    "flex-col",
    "gap-[4px]",
    "w-32",
    "h-[165px]",
  ])}
  on:click={_ => {
    if (onClick) { onClick() }
  }}
  on:drop={_ => {
    if (onDrop) { onDrop() }
  }}
  on:dragover={e => {
    if (onDropAllow && onDropAllow()) {
      // prevent default to allow drop
      e.preventDefault()
    }
  }}
>
  {#if imageSrc}
    <img
      class={concat([
        "size-full",
        "object-contain",
      ])}
      src={imageSrc}
      alt=""
    >
  {:else}
    <div class={concat([
      "border",
      "size-full",
      "border-black",
    ])} />
  {/if}
  <div class={concat([
    "w-full",
    "font-bold",
    "text-[14px]",
    "leading-[17px]",
    "text-center",
    "hyphens-auto",
  ])}>
    {description}
  </div>
</button>
