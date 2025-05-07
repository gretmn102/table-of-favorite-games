<script lang="ts">
  import { concat } from "../utils"
  import GameAddButton from "./GameAddButton.svelte";
  import GameCover from "./GameCover.svelte"

  const gameCoverSrcs = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.stopgame.ru%2Fgames%2Flogos%2F2570%2Fc896x896%2FTGiOlrrvyLUQ8Y8oxp_roA%2Fseverance_blade_of_darkness-square.jpg&f=1&nofb=1&ipt=eaa111b72a13ec8b5c085d90b3abb9f78d1b94d7717f23f98a294607b5d36e14",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.gracza.pl%2Fgaleria%2Fgry13%2F273966203.jpg&f=1&nofb=1&ipt=f93bac3a271218cbaee9be0c303bf21bb1408b4836829a6e2c57ac554751a16b",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-XcreMXuziuo%2FXhIXEUFO-fI%2FAAAAAAAARgQ%2Fp73GXdC5lgQE6MRmnf3fJZ2Ek9j32cdLgCLcBGAsYHQ%2Fs1600%2FDOOMII-cov.jpg&f=1&nofb=1&ipt=f5fbb11fcceb9b0dc84d10892c81a799fa1ed15a6229709aeb9fe88f559b3cfc",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.stopgame.ru%2Fgames%2Flogos%2F2570%2Fc896x896%2FTGiOlrrvyLUQ8Y8oxp_roA%2Fseverance_blade_of_darkness-square.jpg&f=1&nofb=1&ipt=eaa111b72a13ec8b5c085d90b3abb9f78d1b94d7717f23f98a294607b5d36e14",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.gracza.pl%2Fgaleria%2Fgry13%2F273966203.jpg&f=1&nofb=1&ipt=f93bac3a271218cbaee9be0c303bf21bb1408b4836829a6e2c57ac554751a16b",
  ]
</script>

<div class={concat([
  "w-full",
  "h-[127px]",
  "flex",
  "overflow-auto",
])}>
  {#each gameCoverSrcs as gameCoverSrc }
    <GameCover src={gameCoverSrc} />
  {/each}
  <div>
    <GameAddButton />
  </div>
</div>
