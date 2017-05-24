import * as d3 from 'd3'

/**
 * Return marginalized histogram data across x and y
 */
export function marginalize (data, scaleType) {
  let x = data.map(d => d.x)
  if (scaleType.x === 'log') x = x.map(d => Math.log(d))
  let y = data.map(d => d.y)
  if (scaleType.y === 'log') y = y.map(d => Math.log(d))

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
export function getScale (dataSeries, scaleType, range) {
  return {
    'linear': d3.scaleLinear,
    'log': d3.scaleLog,
    'time': d3.scaleTime
  }[scaleType]()
      .domain(d3.extent(dataSeries))
      .range(range)
}

/**
 * Get ticks depending on the type
 */
export function getTicks (dataSeries, tickType, scaleType) {
  if (tickType === 'plain') {
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
  } else if (tickType === 'quartile') {
    return [0, 0.25, 0.5, 0.75, 1].map(q => d3.quantile(dataSeries.concat().sort((x, y) => x - y), q))
  } else {
    return d3.ticks(Math.min(...dataSeries), Math.max(...dataSeries), 5)
  }
}
