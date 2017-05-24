import * as d3 from 'd3'
import * as utils from '../utils'

export default class LinePatch {
  constructor (svg, bounds, data, cfg) {
    let xScale = utils.getScale(
      data.map(d => d.x),
      cfg.scaleType.x,
      [0, bounds.width]
    )
    let yScale = utils.getScale(
      data.map(d => d.y),
      cfg.scaleType.y,
      [bounds.height, 0]
    )

    let line = d3.line()
        .x(d => xScale(d.x) + bounds.x)
        .y(d => yScale(d.y) + bounds.y)

    if (cfg.smoothing) {
      line = line.curve(d3.curveBasis)
    }

    svg.append('g').append('path')
      .attr('class', 'line')
      .datum(data)
      .transition()
      .duration(200)
      .attr('d', line)
  }
}
