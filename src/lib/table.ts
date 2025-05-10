import GameCoverStorage from "../stores/gameCoverStorage"
import CellData from "../stores/cellData"
import CellStorage from "../stores/cellStorage"
import { calcFitScale } from "../utils"

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

export type CellParams = {
  width: number
  height: number
  gap: number
  descriptionFont: string
  descriptionLineHeight: number
}

export namespace CellParams {
  export function create(): CellParams {
    return {
      width: 127,
      height: 165,
      gap: 4,
      descriptionFont: "bold 14px Tahoma",
      descriptionLineHeight: 17,
    }
  }
}

export namespace CellView {
  export function draw(
    canvasContext: CanvasRenderingContext2D,
    {
      width: cellWidth,
      height: cellHeight,
      descriptionFont,
      descriptionLineHeight,
      gap,
    }: CellParams,
    gameCoverStorage: GameCoverStorage,
    cell: CellData,
    [x, y]: [ number, number ],
  ) {
    function drawText() {
      canvasContext.font = descriptionFont
      const lines = TextDrawing.splitToLines(canvasContext, cell.description, cellWidth)
      canvasContext.textBaseline = "top"
      const linesHeight = descriptionLineHeight * lines.length
      TextDrawing.drawTextLines(
        canvasContext,
        lines,
        x,
        y + (cellHeight - linesHeight),
        cellWidth,
        descriptionLineHeight,
      )
      return linesHeight
    }

    function drawImage(x: number, y: number, blockWidth: number, blockHeight: number) {
      if (!cell.imageSrc) { return false }
      const gameCover = GameCoverStorage.get(gameCoverStorage, cell.imageSrc)
      if (!gameCover) { return false }
      const image = gameCover.imageBitmap
      const imageWidth = image.width
      const imageHeight = image.height
      const fitScale = calcFitScale(
        { width: blockWidth, height: blockHeight},
        { width: imageWidth, height: imageHeight},
      )
      const [w, h] = [imageWidth * fitScale, imageHeight * fitScale]
      canvasContext.drawImage(
        image,
        x + (blockWidth / 2 - w / 2), y + (blockHeight / 2 - h / 2),
        w, h,
      )
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
    const gameCoverBlockHeight = cellHeight - textHeight - gap
    if (!drawImage(x, y, gameCoverBlockWidth, gameCoverBlockHeight)) {
      drawRect(x, y, gameCoverBlockWidth, gameCoverBlockHeight)
    }
  }
}

export type Table = {
  cells: CellStorage
  gapX: number
  gapY: number
  cellParams: CellParams
  width: number
  height: number
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

  export function defineSize(
    { width: cellWidth, height: cellHeight }: CellParams,
    cellsCount: number,
    gapX: number,
    gapY: number,
    rowsCount: number,
  ): [number, number] {
    const columnsCount = Math.ceil(cellsCount / rowsCount)
    return [
      cellWidth + (gapX + cellWidth) * (rowsCount - 1),
      cellHeight + (gapY + cellHeight) * (columnsCount - 1),
    ]
  }

  export function drawCells(
    table: Table,
    gameCoverStorage: GameCoverStorage,
    canvasContext: CanvasRenderingContext2D,
  ) {
    const width = table.width
    const height = table.height
    const cellParams = table.cellParams
    const cellWidth = cellParams.width
    const cellHeight = cellParams.height
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
      CellView.draw(canvasContext, cellParams, gameCoverStorage, cell, [x, y])
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
