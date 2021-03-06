import * as d3 from 'd3'
import * as utils from './utils'
import parseConfig from '../config'
import { ScatterPatch, ScatterPatchCanvas } from './patches/scatter'
import LinePatch from './patches/line'
import { XAxisPatch, YAxisPatch } from './patches/axis'

export default class ScatterPlot {
  constructor (target, data, config) {
    let cfg = parseConfig(target, data, config)

    let selection = d3.select(target)
        .attr('class', 'tufte-scatter-plot')

    let svg = selection.append('svg')
        .attr('width', cfg.width)
        .attr('height', cfg.height)

    // Setup layout
    if (cfg.marginal) {
      let [xMarginalizedData, yMarginalizedData] = utils.marginalize(data, cfg.scaleType)
      new LinePatch( // eslint-disable-line no-new
        svg,
        cfg.xMarginalBounds,
        xMarginalizedData,
        cfg.overwrite({
          smoothing: true,
          scaleType: { y: 'linear', x: 'linear' }
        })
      )
      new LinePatch( // eslint-disable-line no-new
        svg,
        cfg.yMarginalBounds,
        yMarginalizedData,
        cfg.overwrite({
          smoothing: true,
          scaleType: { x: 'linear', y: 'linear' }
        })
      )
    }

    // Plot axes
    new XAxisPatch(svg, cfg.xAxisBounds, data.map(d => d.x), cfg) // eslint-disable-line no-new
    new YAxisPatch(svg, cfg.yAxisBounds, data.map(d => d.y), cfg) // eslint-disable-line no-new

    if (data.length > 2000) {
      new ScatterPatchCanvas(svg, cfg.drawingBounds, data, cfg.overwrite({ tooltip: true })) // eslint-disable-line no-new
    } else {
      new ScatterPatch(svg, cfg.drawingBounds, data, cfg.overwrite({ tooltip: true })) // eslint-disable-line no-new
    }
  }
}
