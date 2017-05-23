import * as d3 from 'd3'

/**
 * Parse config to setup a few general things
 */
export function parseConfig (target, data, config) {
  let selection = d3.select(target)
      .attr('class', 'tufte-plot')

  let selectionBB = selection.node().getBoundingClientRect()
  let selectionHeight = (selectionBB.height === 0 ? 400 : selectionBB.height)
  let selectionWidth = selectionBB.width

  if (config && config.width) {
    selectionWidth = config.width
  }

  // Heuristic to check whether we can make the plot cleaner
  let clean = selectionWidth / data.length > 15

  return Object.assign({
    height: selectionHeight,
    width: selectionWidth,
    margin: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 20
    },
    clean: clean,
    axisBand: {
      x: (config && config.axisLabel && config.axisLabel.x) ? 50 : 30,
      y: clean ? 0 : (config && config.axisLabel && config.axisLabel.y) ? 50 : 30
    },
    axisMargin: 20,
    axisLabel: {
      x: null,
      y: null
    },
    scaleType: {
      x: 'linear',
      y: 'linear'
    },
    tooltip: true
  }, config)
}

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
