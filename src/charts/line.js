import * as d3 from 'd3'
import * as utils from './utils'
import LinePatch from './patches/line'
import ScatterPatch from './patches/scatter'
import { XAxisPatch, YAxisPatch } from './patches/axis'
import Tooltip from '../tooltip'

export default class LinePlot {
  constructor (target, data, config) {
    let cfg = utils.parseConfig(target, config)

    let selection = d3.select(target)
        .attr('class', 'tufte-line-plot')

    let uheight = cfg.height - cfg.margins.top - cfg.margins.bottom
    let uwidth = cfg.width - cfg.margins.left - cfg.margins.right

    let svg = selection.append('svg')
        .attr('width', cfg.width)
        .attr('height', cfg.height)

    // Setup layout
    // Heuristic to check whether we need points / y axis
    let clean = cfg.width / data.length > 15

    let xAxisBand = 30
    let yAxisBand = clean ? 0 : 30
    let axisMargin = 10

    let drawingBound = {
      height: uheight - xAxisBand - axisMargin,
      width: uwidth - yAxisBand - axisMargin,
      x: cfg.margins.left + yAxisBand + axisMargin,
      y: cfg.margins.top
    }

    let xAxisBounds = {
      height: xAxisBand,
      width: uwidth - yAxisBand - axisMargin,
      x: cfg.margins.left + yAxisBand + axisMargin,
      y: cfg.margins.top + uheight - xAxisBand
    }

    // Plot axes
    new XAxisPatch(svg, xAxisBounds, data) // eslint-disable-line no-new
    if (!clean) {
      let yAxisBounds = {
        height: uheight - xAxisBand - axisMargin,
        width: yAxisBand,
        x: cfg.margins.left + yAxisBand,
        y: cfg.margins.top
      }
      new YAxisPatch(svg, yAxisBounds, data) // eslint-disable-line no-new
    }

    // Plot line
    new LinePatch(svg, drawingBound, data, {smooth: cfg.smooth}) // eslint-disable-line no-new

    // Scatter points with tooltip only if data is less
    if (clean) {
      let tooltip = new Tooltip(target)
      new ScatterPatch(svg, drawingBound, data, { tooltip: tooltip })  // eslint-disable-line no-new
    }
  }
}
