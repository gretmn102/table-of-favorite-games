import { CellData, CellStorage, GameCoverStorage } from "./types"

export type Table = {
  cells: CellStorage
  gapX: number,
  gapY: number,
  cellWidth: number,
  cellHeight: number,
  width: number,
  height: number,
}

export namespace Table {
  export function defineCount(
    sourceLength: number,
    gap: number,
    targetLength: number,
  ) {
    const tailLength = targetLength - sourceLength
    if (tailLength < 0) {
      return 0
    }
    return 1 + (tailLength / (gap + sourceLength) | 0)
  }

  export function drawCell(
    canvasContext: CanvasRenderingContext2D,
    {
      cellWidth,
      cellHeight,
    }: Table,
    gameCoverStorage: GameCoverStorage,
    cell: CellData,
    [x, y]: [ number, number ],
  ) {
    function drawImage() {
      if (!cell.imageSrc) { return false }
      const gameCover = GameCoverStorage.get(gameCoverStorage, cell.imageSrc)
      if (!gameCover) { return false }
      canvasContext.drawImage(gameCover.imageBitmap, x, y, cellWidth, cellHeight)
      return true
    }

    if (!drawImage()) {
      canvasContext.beginPath()
      canvasContext.lineWidth = 1
      canvasContext.rect(x + 0.5, y + 0.5, cellWidth - 1, cellHeight - 1)
      canvasContext.stroke()
    }
  }

  export function drawCells(
    table: Table,
    gameCoverStorage: GameCoverStorage,
    canvasContext: CanvasRenderingContext2D,
  ) {
    const width = table.width
    const height = table.height
    const cellWidth = table.cellWidth
    const cellHeight = table.cellHeight
    const cells = table.cells
    const cellsCount = cells.length
    const gapX = table.gapX
    const gapY = table.gapY
    const rowsCount = defineCount(cellWidth, gapX, width)
    const columnsCount = defineCount(cellHeight, gapY, height)

    for (let cellIndex = 0; cellIndex < cellsCount; cellIndex++) {
      const cell = cells[cellIndex]
      const [rowIndex, columnIndex] = [cellIndex % rowsCount, cellIndex / rowsCount | 0]
      if (columnIndex >= columnsCount) { break }
      const x = rowIndex * (gapX + cellWidth)
      const y = columnIndex * (gapY + cellHeight)
      drawCell(canvasContext, table, gameCoverStorage, cell, [x, y])
    }
    // for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
    //   const y = columnIndex * (gapY + cellHeight)
    //   for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    //     const x = rowIndex * (gapX + cellWidth)
    //     canvasContext.rect(x + 0.5, y + 0.5, cellWidth - 1, cellHeight - 1)
    //   }
    // }
  }

  export function draw(
    table: Table,
    gameCoverStorage: GameCoverStorage,
    canvasContext: CanvasRenderingContext2D,
  ) {
    drawCells(table, gameCoverStorage, canvasContext)
  }
}