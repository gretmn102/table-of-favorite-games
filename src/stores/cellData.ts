import update from "immutability-helper"
import { type Option } from "@fering-org/functional-helper"

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

export default CellData
