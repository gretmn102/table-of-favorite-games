import update from "immutability-helper"
import { type Option } from "@fering-org/functional-helper"

import { type GameCoverId } from "./gameCoverId"
import { type GameCoverData }from "./gameCoverData"

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

export default GameCoverStorage
