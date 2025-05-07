<script lang="ts">
  import { concat } from "./utils"
  import NavBar from "./components/NavBar.svelte"
  import Palette from "./components/Palette.svelte"
  import GameCanvas from "./components/GameCanvas.svelte"
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
      <NavBar />
      <div class={concat([
        "size-full",
        "px-[4px]",
        "flex",
        "flex-col",
        "items-center",
        "gap-[2px]",
      ])}>
        <Palette />
        <div class={concat([
          // "flex-grow",
        ])}>
          <GameCanvas />
        </div>
      </div>
    </div>
  </div>
</main>
