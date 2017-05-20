/**
 * Regular data range function
 */
export function getRange (data) {
  let x = data.map(d => d.x)
  let y = data.map(d => d.y)

  return {
    x: [Math.min(...x), Math.max(...x)],
    y: [Math.min(...y), Math.max(...y)]
  }
}
