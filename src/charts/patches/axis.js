import * as d3 from 'd3'
import * as utils from '../utils'
import AnnotationPatch from './annotation'

export class XAxisPatch {
  constructor (svg, bounds, dataSeries, cfg) {
    let xAxisDiv = svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${bounds.y})`)

    if (cfg.label.x) {
      new AnnotationPatch(svg, {x: bounds.x + bounds.width, y: bounds.y + 40}, cfg.label.x) // eslint-disable-line no-new
    }

    let xScale = utils.getScale(
      dataSeries,
      cfg.scaleType.x,
      [bounds.x, bounds.width + bounds.x]
    )

    let xAxis = d3.axisBottom(xScale)

    if (cfg.scaleType.x === 'time') {
      xAxis.ticks(5)
    } else {
      xAxis.tickValues(utils.getTicks(dataSeries, cfg.tickType.x, cfg.scaleType.x))
    }

    xAxisDiv.transition().duration(200).call(xAxis)
  }
}

export class YAxisPatch {
  constructor (svg, bounds, dataSeries, cfg) {
    let yAxisDiv = svg.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', `translate(${bounds.x}, 0)`)

    if (cfg.label.y) {
      new AnnotationPatch(svg, {x: 10, y: bounds.y}, cfg.label.y, { horizontal: false }) // eslint-disable-line no-new
    }

    let yScale = utils.getScale(
      dataSeries,
      cfg.scaleType.y,
      [bounds.y + bounds.height, bounds.y]
    )

    let yAxis = d3.axisLeft(yScale)

    if (cfg.scaleType.y === 'time') {
      yAxis.ticks(5)
    } else {
      yAxis.tickValues(utils.getTicks(dataSeries, cfg.tickType.y, cfg.scaleType.y))
    }

    yAxisDiv.transition().duration(200).call(yAxis)
  }
}
