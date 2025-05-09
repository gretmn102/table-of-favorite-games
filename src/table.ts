import { CellData, CellStorage, GameCoverStorage } from "./types"

const cellGap = 4
const cellDescriptionFont = "bold 14px Tahoma"
const cellDescriptionLineHeight = 17

export namespace TextDrawing {
  export function splitToLines(
    context: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
  ): string[] {
    const words = text.split(' ')
    const lines = new Array<string>()
    let line = ''
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      const testLine = line + words[wordIndex] + ' '
      const metrics = context.measureText(testLine)
      const testWidth = metrics.width
      if (testWidth > maxWidth && wordIndex > 0) {
        lines.push(line)
        line = words[wordIndex] + ' '
      } else {
        line = testLine
      }
    }
    lines.push(line)
    return lines
  }

  export function drawTextLines(
    context: CanvasRenderingContext2D,
    lines: string[],
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    context.textAlign = "center"
    const halfMaxWidth = Math.round(maxWidth / 2) + 1
    let currentY = y
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]
      context.fillText(line, x + halfMaxWidth, currentY)
      currentY += lineHeight
    }
  }
}

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
    { cellWidth, cellHeight }: Table,
    gameCoverStorage: GameCoverStorage,
    cell: CellData,
    [x, y]: [ number, number ],
  ) {
    function drawText() {
      canvasContext.font = cellDescriptionFont
      const lines = TextDrawing.splitToLines(canvasContext, cell.description, cellWidth)
      canvasContext.textBaseline = "top"
      const linesHeight = cellDescriptionLineHeight * lines.length
      TextDrawing.drawTextLines(
        canvasContext,
        lines,
        x,
        y + (cellHeight - linesHeight),
        cellWidth,
        cellDescriptionLineHeight,
      )
      return linesHeight
    }

    function drawImage(x: number, y: number, blockWidth: number, blockHeight: number) {
      if (!cell.imageSrc) { return false }
      const gameCover = GameCoverStorage.get(gameCoverStorage, cell.imageSrc)
      if (!gameCover) { return false }
      canvasContext.drawImage(gameCover.imageBitmap, x, y, blockWidth, blockHeight)
      return true
    }

    function drawRect(x: number, y: number, width: number, height: number) {
      canvasContext.beginPath()
      canvasContext.lineWidth = 1
      canvasContext.rect(x + 0.5, y + 0.5, width - 1, height - 1)
      canvasContext.stroke()
    }

    const textHeight = drawText()

    const gameCoverBlockWidth = cellWidth
    const gameCoverBlockHeight = cellHeight - textHeight - cellGap
    if (!drawImage(x, y, gameCoverBlockWidth, gameCoverBlockHeight)) {
      drawRect(x, y, gameCoverBlockWidth, gameCoverBlockHeight)
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
  }

  export function draw(
    table: Table,
    gameCoverStorage: GameCoverStorage,
    canvasContext: CanvasRenderingContext2D,
  ) {
    drawCells(table, gameCoverStorage, canvasContext)
  }
}
