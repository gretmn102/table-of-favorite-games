import update from "immutability-helper"
import { type Option } from "@fering-org/functional-helper"

export type GameCoverId = string

export type GameCoverData = {
  id: GameCoverId
  imageBitmap: ImageBitmap
}
