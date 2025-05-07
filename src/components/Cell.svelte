<script lang="ts">
  import { Option } from "@fering-org/functional-helper"

  import { concat } from "../utils"
  export let description: string
  export let imageSrc: Option<string>
</script>

<div class={concat([
  "flex",
  "flex-col",
  "gap-[4px]",
  "w-32",
  "h-[165px]",
])}>
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
</div>