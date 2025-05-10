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

  export function add(
    storage: GameCoverStorage,
    newGameCover: GameCoverData
  ): GameCoverStorage {
    return update(storage, {
      [newGameCover.id]: { $set: newGameCover }
    })
  }

  export function get(
    storage: GameCoverStorage,
    id: GameCoverId
  ): Option<GameCoverData> {
    return storage.get(id)
  }
}
