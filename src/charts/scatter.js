import * as d3 from 'd3'
import * as utils from './utils'
import ScatterPatch from './patches/scatter'
import LinePatch from './patches/line'
import { XAxisPatch, YAxisPatch } from './patches/axis'
import Tooltip from '../tooltip'

export default class LinePlot {
  constructor (target, data, config) {
    let cfg = utils.parseConfig(target, data, config)

    let selection = d3.select(target)
        .attr('class', 'tufte-scatter-plot')

    let uheight = cfg.height - cfg.margin.top - cfg.margin.bottom
    let uwidth = cfg.width - cfg.margin.left - cfg.margin.right

    let svg = selection.append('svg')
        .attr('width', cfg.width)
        .attr('height', cfg.height)

    // Setup layout
    let marginalBand = cfg.marginal ? 50 : 0

    let drawingBound = {
      height: uheight - cfg.axisBand.x - cfg.axisMargin - marginalBand,
      width: uwidth - cfg.axisBand.y - cfg.axisMargin - marginalBand,
      x: cfg.margin.left + cfg.axisBand.y + cfg.axisMargin + marginalBand,
      y: cfg.margin.top
    }

    let xAxisBounds = {
      height: cfg.axisBand.x,
      width: uwidth - cfg.axisBand.y - cfg.axisMargin - marginalBand,
      x: cfg.margin.left + cfg.axisBand.y + cfg.axisMargin + marginalBand,
      y: cfg.margin.top + uheight - cfg.axisBand.x
    }

    let yAxisBounds = {
      height: uheight - cfg.axisBand.x - cfg.axisMargin - marginalBand,
      width: cfg.axisBand.y,
      x: cfg.margin.left + cfg.axisBand.y,
      y: cfg.margin.top
    }

    if (marginalBand > 0) {
      let xMarginalBounds = {
        height: marginalBand,
        width: drawingBound.width,
        x: drawingBound.x,
        y: cfg.margin.top + drawingBound.height + cfg.axisMargin
      }

      let yMarginalBounds = {
        height: drawingBound.height,
        width: marginalBand,
        x: cfg.margin.left + cfg.axisBand.y,
        y: cfg.margin.top
      }

      let [xMarginalizedData, yMarginalizedData] = utils.marginalize(data)
      new LinePatch(svg, xMarginalBounds, xMarginalizedData, { smooth: true, scaleType: cfg.scaleType }) // eslint-disable-line no-new
      new LinePatch(svg, yMarginalBounds, yMarginalizedData, { smooth: true, scaleType: cfg.scaleType }) // eslint-disable-line no-new
    }

    // Plot axes
    new XAxisPatch(svg, xAxisBounds, data, { // eslint-disable-line no-new
      scaleType: cfg.scaleType.x,
      axisLabel: cfg.axisLabel.x
    })
    new YAxisPatch(svg, yAxisBounds, data, { // eslint-disable-line no-new
      scaleType: cfg.scaleType.y,
      axisLabel: cfg.axisLabel.y
    })

    // Scatter points with tooltip only if data is less
    let tooltip = new Tooltip(target)
    new ScatterPatch(svg, drawingBound, data, { tooltip: tooltip, scaleType: cfg.scaleType })  // eslint-disable-line no-new
  }
}
