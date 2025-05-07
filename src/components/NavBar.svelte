<script lang="ts">
  import { concat } from "../utils"
</script>

<nav
  class={concat([
    "w-full",
    "h-[55px]",
    "px-[8px]",
    "py-[4px]",
    "flex",
  ])}
>
  <div
    id="left"
    class={concat([
      "grow",
      "flex",
      "items-center",
      "gap-[10px]",
    ])}
  >
    <img
      class={concat([
        "w-fit", "h-fit",
      ])}
      src="./table-favorite-games.webp"
      alt="logo"
    >
    <div
      class={concat([
        "text-xl",
      ])}
    >
      Любимые игры
    </div>
  </div>
  <div
    id="right"
    class={concat([

    ])}
  >
    <div class={concat([
      "w-11",
      "h-full",
      "flex",
      "items-center",
    ])}>
      <svg viewBox="0 0 16 16">
        <use xlink:href="github-icon.svg#root" href="github-icon.svg#root" />
      </svg>
    </div>
  </div>
</nav>
