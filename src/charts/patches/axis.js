import * as d3 from 'd3'
import * as utils from '../utils'
import AnnotationPatch from './annotation'

export class XAxisPatch {
  constructor (svg, bounds, data, cfg) {
    let xAxisDiv = svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${bounds.y})`)

    if (cfg.label.x) {
      new AnnotationPatch(svg, {x: bounds.x + bounds.width, y: bounds.y + 40}, cfg.label.x) // eslint-disable-line no-new
    }

    let xScale = utils.getScale(
      cfg.scaleType.x,
      data.map(d => d.x),
      [bounds.x, bounds.width + bounds.x]
    )

    let xAxis = d3.axisBottom(xScale).ticks(5)
    xAxisDiv.transition().duration(200).call(xAxis)
  }
}

export class YAxisPatch {
  constructor (svg, bounds, data, cfg) {
    let yAxisDiv = svg.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', `translate(${bounds.x}, 0)`)

    if (cfg.label.y) {
      new AnnotationPatch(svg, {x: 10, y: bounds.y}, cfg.label.y, { horizontal: false }) // eslint-disable-line no-new
    }

    let yScale = utils.getScale(
      cfg.scaleType.y,
      data.map(d => d.y),
      [bounds.y + bounds.height, bounds.y]
    )

    let yAxis = d3.axisLeft(yScale).ticks(5)
    yAxisDiv.transition().duration(200).call(yAxis)
  }
}
