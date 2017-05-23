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

    let uheight = cfg.height - cfg.margin.top - cfg.margin.bottom
    let uwidth = cfg.width - cfg.margin.left - cfg.margin.right

    let svg = selection.append('svg')
        .attr('width', cfg.width)
        .attr('height', cfg.height)

    // Setup layout
    let drawingBound = {
      height: uheight - cfg.axisBand.x - cfg.axisMargin,
      width: uwidth - cfg.axisBand.y - cfg.axisMargin,
      x: cfg.margin.left + cfg.axisBand.y + cfg.axisMargin,
      y: cfg.margin.top
    }

    let xAxisBounds = {
      height: cfg.axisBand.x,
      width: uwidth - cfg.axisBand.y - cfg.axisMargin,
      x: cfg.margin.left + cfg.axisBand.y + cfg.axisMargin,
      y: cfg.margin.top + uheight - cfg.axisBand.x
    }

    // Plot axes
    new XAxisPatch(svg, xAxisBounds, data) // eslint-disable-line no-new
    if (!cfg.clean) {
      let yAxisBounds = {
        height: uheight - cfg.axisBand.x - cfg.axisMargin,
        width: cfg.axisBand.y,
        x: cfg.margin.left + cfg.axisBand.y,
        y: cfg.margin.top
      }
      new YAxisPatch(svg, yAxisBounds, data) // eslint-disable-line no-new
    }

    // Plot line
    new LinePatch(svg, drawingBound, data, { smooth: cfg.smooth }) // eslint-disable-line no-new

    // Scatter points with tooltip only if data is less
    if (cfg.clean) {
      let tooltip = cfg.tooltip === true ? (new Tooltip(target)) : null
      new ScatterPatch(svg, drawingBound, data, { tooltip: tooltip, r: '6px' })  // eslint-disable-line no-new
    }
  }
}
