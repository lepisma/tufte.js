import * as d3 from 'd3'
import * as utils from './utils'
import LinePatch from './patches/line'
import ScatterPatch from './patches/scatter'
import { XAxisPatch, YAxisPatch } from './patches/axis'
import Tooltip from '../tooltip'

export default class LinePlot {
  constructor (target, data, config) {
    let cfg = utils.parseConfig(target, data, config)

    let selection = d3.select(target)
        .attr('class', 'tufte-line-plot')

    let uheight = cfg.height - cfg.margins.top - cfg.margins.bottom
    let uwidth = cfg.width - cfg.margins.left - cfg.margins.right

    let svg = selection.append('svg')
        .attr('width', cfg.width)
        .attr('height', cfg.height)

    // Setup layout
    let drawingBound = {
      height: uheight - cfg.axisBands.x - cfg.axisMargin,
      width: uwidth - cfg.axisBands.y - cfg.axisMargin,
      x: cfg.margins.left + cfg.axisBands.y + cfg.axisMargin,
      y: cfg.margins.top
    }

    let xAxisBounds = {
      height: cfg.axisBands.x,
      width: uwidth - cfg.axisBands.y - cfg.axisMargin,
      x: cfg.margins.left + cfg.axisBands.y + cfg.axisMargin,
      y: cfg.margins.top + uheight - cfg.axisBands.x
    }

    // Plot axes
    new XAxisPatch(svg, xAxisBounds, data) // eslint-disable-line no-new
    if (!cfg.clean) {
      let yAxisBounds = {
        height: uheight - cfg.axisBands.x - cfg.axisMargin,
        width: cfg.axisBands.y,
        x: cfg.margins.left + cfg.axisBands.y,
        y: cfg.margins.top
      }
      new YAxisPatch(svg, yAxisBounds, data) // eslint-disable-line no-new
    }

    // Plot line
    new LinePatch(svg, drawingBound, data, {smooth: cfg.smooth}) // eslint-disable-line no-new

    // Scatter points with tooltip only if data is less
    if (cfg.clean) {
      let tooltip = new Tooltip(target)
      new ScatterPatch(svg, drawingBound, data, { tooltip: tooltip, r: '6px' })  // eslint-disable-line no-new
    }
  }
}
