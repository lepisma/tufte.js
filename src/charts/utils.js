import * as d3 from 'd3'

/**
 * Return marginalized histogram data across x and y
 */
export function marginalize (data) {
  let x = data.map(d => d.x)
  let y = data.map(d => d.y)

  let countsX = d3.histogram().thresholds(d3.thresholdSturges(x))(x).map(bin => bin.length)
  let countsY = d3.histogram().thresholds(d3.thresholdSturges(y))(y).map(bin => bin.length)

  return [
    countsX.map((c, idx) => {
      return {
        x: idx,
        y: c
      }
    }),
    countsY.map((c, idx) => {
      return {
        x: c,
        y: idx
      }
    })
  ]
}

/**
 * Get scale depending on the type and range, using the single data series
 */
export function getScale (type, dataSeries, range) {
  return {
    'linear': d3.scaleLinear,
    'log': d3.scaleLog
  }[type]()
      .domain(d3.extent(dataSeries))
      .range(range)
}

/**
 * Get ticks depending on the type
 */
export function getTicks (type, dataSeries) {
  if (type === 'plain') {
    let min = Math.min(...dataSeries)
    let max = Math.max(...dataSeries)
    let d3Ticks = d3.ticks(min, max, 5)

    if (d3Ticks.indexOf(min) === -1) {
      d3Ticks.splice(0, 1, min)
    }

    if (d3Ticks.indexOf(max) === -1) {
      d3Ticks.splice(d3Ticks.length - 1, 1, max)
    }

    return d3Ticks
  } else {
    return 5
  }
}
