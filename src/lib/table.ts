import GameCoverStorage from "../stores/gameCoverStorage"
import CellData from "../stores/cellData"
import CellStorage from "../stores/cellStorage"
import { calcFitScale, type Pos, type Size } from "./utils"

export type TextView = {
  lineHeight: number
  width: number
  height: number
  lines: string[]
}

export namespace TextView {
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

  export function create(
    context: CanvasRenderingContext2D,
    text: string,
    lineHeight: number,
    maxWidth?: number,
  ): TextView {
    if (!maxWidth) {
      return {
        lineHeight,
        width: context.measureText(text).width,
        height: lineHeight,
        lines: [text],
      }
    }
    const lines = splitToLines(context, text, maxWidth)
    return {
      lineHeight,
      width: maxWidth,
      height: lineHeight * lines.length,
      lines,
    }
  }

  export function draw(
    { lines, lineHeight, width }: TextView,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    context.textBaseline = "top"
    context.textAlign = "center"
    const halfWidth = Math.round(width / 2) + 1
    let currentY = y
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]
      context.fillText(line, x + halfWidth, currentY)
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
      canvasContext.fillStyle = "black"
      canvasContext.font = descriptionFont
      const textView = TextView.create(
        canvasContext,
        cell.description,
        descriptionLineHeight,
        cellWidth
      )
      TextView.draw(
        textView,
        canvasContext,
        x,
        y + (cellHeight - textView.height)
      )
      return textView.height
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

  export function create(
    cells: CellStorage,
    columnsCount: number,
  ): Table {
    const [gapX, gapY] = [50, 58]
    const cellParams = CellParams.create()
    const [width, height] = Table.defineSize(
      cellParams, cells.length, gapX, gapY, columnsCount
    )
    const table = {
      cells,
      gapX,
      gapY,
      cellParams,
      width,
      height,
    }
    return table
  }

  export function drawCells(
    table: Table,
    gameCoverStorage: GameCoverStorage,
    canvasContext: CanvasRenderingContext2D,
    pos: Pos,
  ) {
    const { x: initX, y: initY } = pos
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
      const x = initX + rowIndex * (gapX + cellWidth)
      const y = initY + columnIndex * (gapY + cellHeight)
      CellView.draw(canvasContext, cellParams, gameCoverStorage, cell, [x, y])
    }
  }

  export function draw(
    table: Table,
    gameCoverStorage: GameCoverStorage,
    canvasContext: CanvasRenderingContext2D,
    pos: Pos,
  ) {
    drawCells(table, gameCoverStorage, canvasContext, pos)
  }
}

export type OutputImage = {
  titleView: TextView
  tableView: Table
  size: Size
}

export namespace OutputImage {
  export function create(
    canvasContext: CanvasRenderingContext2D,
    cellStorage: CellStorage,
  ): OutputImage {
    canvasContext.fillStyle = "black"
    canvasContext.font = "bold 20px Tahoma"
    const titleView = TextView.create(
      canvasContext,
      "Любимые игры",
      22,
    )
    const tableView = Table.create(cellStorage, 6)
    const size = {
      width: tableView.width,
      height: titleView.height + tableView.height,
    }
    return {
      titleView,
      tableView,
      size,
    }
  }

  export function draw(
    { size, titleView, tableView }: OutputImage,
    canvasContext: CanvasRenderingContext2D,
    gameCoverStorage: GameCoverStorage,
  ) {
    canvasContext.fillStyle = "white"
    canvasContext.fillRect(0, 0, size.width, size.height)

    canvasContext.textBaseline = "top"
    canvasContext.fillStyle = "black"
    canvasContext.font = "bold 20px Tahoma"
    TextView.draw(
      titleView,
      canvasContext,
      tableView.width / 2 - titleView.width / 2,
      0
    )
    Table.draw(
      tableView,
      gameCoverStorage,
      canvasContext,
      { x: 0, y: titleView.height},
    )
  }
}
