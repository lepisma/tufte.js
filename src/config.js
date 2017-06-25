import * as d3 from 'd3'
import Coelacanth from 'coelacanth'

/**
 * Parse config to setup a few general things
 */
export default function parseConfig (target, data, config) {
  let selection = d3.select(target)
      .attr('class', 'tufte-plot')

  let selectionBB = selection.node().getBoundingClientRect()
  let selectionHeight = Math.max(selectionBB.height, 400)
  let selectionWidth = selectionBB.width

  // Setup defaults
  let defaults = {
    height: selectionHeight,
    width: selectionWidth,
    margin: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 20,
      axis: 20 // Gap between axis and drawing bound
    },
    dotLinePlot: true, // Weather to add scatter points to line patch
    band: {}, // Bands for axis, marginal plots etc.
    label: {
      x: null,
      y: null
    },
    scaleType: {
      x: 'linear',
      y: 'linear'
    },
    tickType: { // Type of ticks display (plain or quartile)
      x: 'plain',
      y: 'plain'
    },
    tooltip: true,
    smoothing: false, // To use smoothing in line patch
    marginal: false,
    r: '2px'
  }

  // Manual overrides
  // Heuristic to check whether we can make the dotline plot
  defaults.dotLinePlot = selectionWidth / data.length > 15

  if (config) {
    if (config.label && config.label.x) {
      defaults.band.x = 50
    }
  }

  let cconfig = new Coelacanth(defaults)

  // Derivations
  cconfig.derive('uheight', node => node.height - node.margin.top - node.margin.bottom)
  cconfig.derive('uwidth', node => node.width - node.margin.left - node.margin.right)

  // Marginal plot band
  cconfig.band.derive('marginal', (node, root) => root.marginal ? 50 : 0)

  // Axis bands
  cconfig.band.derive('x', (node, root) => root.label.x ? 50 : 30)
  cconfig.band.derive('y', (node, root) => root.dotLinePlot ? 0 : (root.label.y ? 60 : 30))

  // Bounds for drawing stuff
  cconfig.derive('drawingBounds', node => {
    return {
      height: node.uheight - node.band.x - node.margin.axis - node.band.marginal,
      width: node.uwidth - node.band.y - node.margin.axis - node.band.marginal,
      x: node.margin.left + node.band.y + node.margin.axis + node.band.marginal,
      y: node.margin.top
    }
  })

  // Bounds for axes
  cconfig.derive('xAxisBounds', node => {
    return {
      height: node.band.x,
      width: node.drawingBounds.width,
      x: node.drawingBounds.x,
      y: node.margin.top + node.uheight - node.band.x
    }
  })

  cconfig.derive('yAxisBounds', node => {
    return {
      height: node.drawingBounds.height,
      width: node.band.y,
      x: node.margin.left + node.band.y,
      y: node.margin.top
    }
  })

  // Bounds for marginal
  cconfig.derive('xMarginalBounds', node => {
    return {
      height: node.band.marginal,
      width: node.drawingBounds.width,
      x: node.drawingBounds.x,
      y: node.margin.top + node.drawingBounds.height + node.margin.axis
    }
  })

  cconfig.derive('yMarginalBounds', node => {
    return {
      height: node.drawingBounds.height,
      width: node.band.marginal,
      x: node.margin.left + node.band.y,
      y: node.margin.top
    }
  })

  return cconfig.overwrite(config)
}
