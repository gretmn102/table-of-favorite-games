<script lang="ts">
  import { Option } from "@fering-org/functional-helper"

  import { concat } from "../utils"
  import Cell from "./Cell.svelte"

  type Cell = {
    description: string
    imageSrc: Option<string>
  }

  const cells: Cell[] = [
    {
      description: "Лучшая игра всех времен",
      imageSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.gracza.pl%2Fgaleria%2Fgry13%2F273966203.jpg&f=1&nofb=1&ipt=f93bac3a271218cbaee9be0c303bf21bb1408b4836829a6e2c57ac554751a16b",
    },
    {
      description: "Лучший сюжет",
      imageSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc1.staticflickr.com%2F5%2F4118%2F4796837181_cf97c9a314_b.jpg&f=1&nofb=1&ipt=cd191dc451ff9bf2d1c44129c95f2bd84c3a4b3ff3ca9ce072e41297eb0ac0c8",
    },
    {
      description: "Лучший визуал",
      imageSrc: undefined,
    },
    {
      description: "Когда-нибудь я завершу ее...",
      imageSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mobygames.com%2Fimages%2Fcovers%2Fl%2F29048-netstorm-islands-at-war-windows-front-cover.jpg&f=1&nofb=1&ipt=0f4370e8052313870cc02582693021524d0e874605288470fb164244531b3b93",
    },
    {
      description: "Сильно повлияла на меня",
      imageSrc: undefined,
    },
    {
      description: "Лучшая боёвка",
      imageSrc: undefined,
    },
    {
      description: "Тебе не нравится, а остальным — да",
      imageSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.gracza.pl%2Fgaleria%2Fgry13%2F273966203.jpg&f=1&nofb=1&ipt=f93bac3a271218cbaee9be0c303bf21bb1408b4836829a6e2c57ac554751a16b",
    },
    {
      description: "Тебе нравится, а остальным — нет",
      imageSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc1.staticflickr.com%2F5%2F4118%2F4796837181_cf97c9a314_b.jpg&f=1&nofb=1&ipt=cd191dc451ff9bf2d1c44129c95f2bd84c3a4b3ff3ca9ce072e41297eb0ac0c8",
    },
    {
      description: "Недооцененная",
      imageSrc: undefined,
    },
    {
      description: "Переоцененная",
      imageSrc: undefined,
    },
    {
      description: "Почему мне это нравится?",
      imageSrc: undefined,
    },
    {
      description: "Всегда к ней возвращаюсь",
      imageSrc: undefined,
    },
  ]
</script>

<div class={concat([
  "w-full",
  "h-full",
  "py-[24px]",
  "flex",
  "flex-row",
  "flex-wrap",
  "justify-center",
  "gap-x-[50px]",
  "gap-y-[58px]",
  "overflow-y-auto",
])}>
  {#each cells as cell}
    <Cell
      description={cell.description}
      imageSrc={cell.imageSrc}
    />
  {/each}
</div>
