import * as d3 from 'd3'
import * as utils from '../utils'

export class XAxisPatch {
  constructor (svg, bounds, data, config) {
    let cfg = Object.assign({ scaleType: 'linear' }, config)

    let xAxisDiv = svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${bounds.y})`)

    let xScale = utils.getScale(
      cfg.scaleType,
      data.map(d => d.x),
      [bounds.x, bounds.width + bounds.x]
    )

    let xAxis = d3.axisBottom(xScale).ticks(5)
    xAxisDiv.transition().duration(200).call(xAxis)
  }
}

export class YAxisPatch {
  constructor (svg, bounds, data, config) {
    let cfg = Object.assign({ scaleType: 'linear' }, config)

    let yAxisDiv = svg.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', `translate(${bounds.x}, 0)`)

    let yScale = utils.getScale(
      cfg.scaleType,
      data.map(d => d.y),
      [bounds.y + bounds.height, bounds.y]
    )

    let yAxis = d3.axisLeft(yScale).ticks(5)
    yAxisDiv.transition().duration(200).call(yAxis)
  }
}
