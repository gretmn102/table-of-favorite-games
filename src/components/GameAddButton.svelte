<script lang="ts">
  import { type Option } from "@fering-org/functional-helper"

  import { concat } from "../lib/utils"

  export let onChange: Option<(files: FileList) => void> = undefined

  let fileInput: Option<HTMLInputElement>
</script>

<button
  class={concat([
    "w-[80px]",
    "h-full",
    "flex",
    "flex-col",
    "gap-[10px]",
    "justify-center",
    "items-center",
  ])}
  on:click={e => {
    if (fileInput) {
      fileInput.showPicker()
    }
  }}
>
  <div class={concat([
    "w-[51px]",
    "h-[51px]",
    "bg-[#1C2222]",
    "border",
    "border-[#514343]",
    "rounded-full",
    "flex",
    "relative",
  ])}>
    <div class={concat([
      "absolute",
      "w-[32px]",
      "h-[11px]",
      "top-[calc(50%-11px/2)]",
      "left-[calc(50%-32px/2)]",
      "bg-[#3DFC00]",
    ])}>
    </div>
    <div class={concat([
      "absolute",
      "w-[11px]",
      "h-[32px]",
      "top-[calc(50%-32px/2)]",
      "left-[calc(50%-11px/2)]",
      "bg-[#3DFC00]",
    ])}>
    </div>
  </div>
  <div class={concat([
    "w-full",
    "h-[34px]",
    "font-bold",
    "text-[14px]",
    "leading-[17px]",
    "text-center",
    "text-[#262323]",
  ])}>
    Добавить обложку
  </div>
  <input
    class={concat([
      "hidden",
    ])}
    bind:this={fileInput}
    type="file"
    accept=".png,.jpeg,.jpg,.webp,.gif"
    multiple
    on:change={e => {
      if (onChange) {
        const fileInput = e.currentTarget
        const files = fileInput.files
        if (files) {
          onChange(files)
        }
      }
    }}
  />
</button>
