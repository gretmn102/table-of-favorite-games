<script lang="ts">
  import { concat } from "./utils"
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
      Hello world!
    </div>
  </div>
</main>
