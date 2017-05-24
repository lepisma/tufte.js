import * as d3 from 'd3'
import parseConfig from '../config'
import LinePatch from './patches/line'
import ScatterPatch from './patches/scatter'
import { XAxisPatch, YAxisPatch } from './patches/axis'

export default class LinePlot {
  constructor (target, data, config) {
    let cfg = parseConfig(target, data, config)

    let selection = d3.select(target)
        .attr('class', 'tufte-line-plot')

    let svg = selection.append('svg')
        .attr('width', cfg.width)
        .attr('height', cfg.height)

    // Plot axes
    new XAxisPatch(svg, cfg.xAxisBounds, data, cfg) // eslint-disable-line no-new
    if (!cfg.dotLinePlot) {
      new YAxisPatch(svg, cfg.yAxisBounds, data, cfg) // eslint-disable-line no-new
    }

    // Plot line
    new LinePatch(svg, cfg.drawingBounds, data, cfg) // eslint-disable-line no-new

    // Scatter points with tooltip only if data is less
    if (cfg.dotLinePlot) {
      new ScatterPatch(svg, cfg.drawingBounds, data, cfg.overwrite({ tooltip: true, r: '6px' })) // eslint-disable-line no-new
    }
  }
}
