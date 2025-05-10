<script lang="ts">
  import { concat } from "../lib/utils"
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
    <a
      class={concat([
        "w-11",
        "h-full",
        "flex",
        "items-center",
        "fill-[#222034]",
        "hover:fill-[#45283c]",
        "focus:fill-[#663931]",
        "active:fill-[#663931]",
      ])}
      href="https://github.com/gretmn102/table-of-favorite-games"
      target="_blank"
    >
      <svg viewBox="0 0 16 16">
        <use xlink:href="github-icon.svg#root" href="github-icon.svg#root" />
      </svg>
    </a>
  </div>
</nav>
