export function concat(classes: string []) {
  return classes.join(" ")
}

export type Size = { width: number, height: number }

export function calcFitScale(
  viewportSize: Size,
  imageSize: Size,
) {
  const dw = imageSize.width - viewportSize.width
  const dh = imageSize.height - viewportSize.height
  if (dw > dh) {
    if (dw > 0) {
      return viewportSize.width / imageSize.width
    }
  } else {
    if (dh > 0) {
      return viewportSize.height / imageSize.height
    }
  }
  return 1
}
