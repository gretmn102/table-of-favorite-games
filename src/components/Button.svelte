<script lang="ts">
  import { concat } from "../utils"
</script>

<button class={concat([
  "py-1.5",
  "px-11",
  "bg-[#10A337]",
  "rounded",
  "flex",
  "justify-center",
  "items-center",
])}>
  <div class={concat([
    "font-inter",
    "font-normal",
    "text-xl",
    "text-[#FFFFFF]",
  ])}>
    <slot />
  </div>
</button>
