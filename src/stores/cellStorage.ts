import update from "immutability-helper"
import CellData from "./cellData"

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
