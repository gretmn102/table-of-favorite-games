import { CellData, CellStorage } from "./types"

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
    [x, y]: [ number, number ],
    {
      cellWidth,
      cellHeight,
    }: Table,
    cell: CellData,
  ) {
    // const b = new Blob([])
    const image = new Image()

    const reader = new FileReader()

    // const imageData = new ImageData(blob)
    const blob: Blob = todo
    createImageBitmap(blob)
      .then(imageBitmap => {
        imageBitmap
      })

    // const imageBitmap = new window.createImageBitmap()

    canvasContext.drawImage()
    cell.imageSrc
  }

  export function drawCells(
    table: Table,
    canvasContext: CanvasRenderingContext2D,
  ) {
    const width = table.width
    const height = table.height
    const cellWidth = table.cellWidth
    const cellHeight = table.cellHeight
    const cellsCount = table.cells.length
    const gapX = table.gapX
    const gapY = table.gapY
    const rowsCount = defineCount(cellWidth, gapX, width)
    const columnsCount = defineCount(cellHeight, gapY, height)

    canvasContext.beginPath()
    canvasContext.lineWidth = 1
    for (let cellIndex = 0; cellIndex < cellsCount; cellIndex++) {
      const [rowIndex, columnIndex] = [cellIndex % rowsCount, cellIndex / rowsCount | 0]
      if (columnIndex >= columnsCount) { break }
      const x = rowIndex * (gapX + cellWidth)
      const y = columnIndex * (gapY + cellHeight)
      // canvasContext.rect(x + 0.5, y + 0.5, cellWidth - 1, cellHeight - 1)
      // canvasContext.drawImage()

    }
    // for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
    //   const y = columnIndex * (gapY + cellHeight)
    //   for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    //     const x = rowIndex * (gapX + cellWidth)
    //     canvasContext.rect(x + 0.5, y + 0.5, cellWidth - 1, cellHeight - 1)
    //   }
    // }
    canvasContext.stroke()
  }

  export function draw(
    table: Table,
    canvasContext: CanvasRenderingContext2D,
  ) {
    drawCells(table, canvasContext)
  }
}