import update from "immutability-helper"
import { type Option } from "@fering-org/functional-helper"

export type GameCoverId = string

export type GameCoverData = {
  id: GameCoverId
  imageBitmap: ImageBitmap
}

export type GameCoverStorage = Map<GameCoverId, GameCoverData>

export namespace GameCoverStorage {
  export function create(): GameCoverStorage {
    return new Map()
  }
}

export type CellData = {
  description: string
  imageSrc: Option<string>
}

export namespace CellData {
  export function updateImageSrc(
    cell: CellData,
    updateImageSrc: (initSrc: Option<string>) => Option<string>
  ) : CellData {
    return update(cell, {
      imageSrc: { $apply: initSrc => updateImageSrc(initSrc) }
    })
  }
}

export type CellStorage = CellData[]

export namespace CellStorage {
  export function create(): CellStorage {
    return [
      "Лучшая игра всех времен",
      "Лучший сюжет",
      "Лучший визуал",
      "Когда-нибудь я завершу ее...",
      "Сильно повлияла на меня",
      "Лучшая боёвка",
      "Тебе не нравится, а остальным — да",
      "Тебе нравится, а остальным — нет",
      "Недооцененная",
      "Переоцененная",
      "Почему мне это нравится?",
      "Всегда к ней возвращаюсь",
      "Лучшая атмосфера",
      "Лекарство от плохого дня",
      "Лучший протагонист",
      "Отдых после работы",
      "Самое большое разочарование",
      "Игра из \"того самого\" времени",
      "Она не лучшая, но прикольная",
      "Преступно забыта",
      "Депрессивная игра",
      "Лучшая активная франшиза",
      "Лучший саундтрек",
      "Обычно я такое не люблю, но...",
    ].map(description => ({
      description,
      imageSrc: undefined
    }))
  }

  export function updateCell(
    cellStorage: CellStorage,
    cellIndex: number,
    updateCell: (cell: CellData) => CellData
  ) : CellStorage {
    return update(cellStorage, {
      [cellIndex]: { $apply: (cell) => {
        return updateCell(cell)
      }}
    })
  }
}
