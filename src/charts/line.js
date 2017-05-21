import * as d3 from 'd3'
import * as utils from './utils'

export default class LinePlot {
  constructor (target, data) {
    let selection = d3.select(target)
        .attr('class', 'tufte-line-plot')

    let selectionBB = selection.node().getBoundingClientRect()
    let selectionHeight = (selectionBB.height === 0 ? 400 : selectionBB.height)
    let selectionWidth = selectionBB.width

    let margins = {
      top: 10,
      bottom: 30,
      left: 30,
      right: 10
    }

    let height = selectionHeight - margins.top - margins.bottom
    let width = selectionWidth - margins.left - margins.right

    let svg = selection.append('svg')
        .attr('width', selectionWidth)
        .attr('height', selectionHeight)

    let ranges = utils.getRange(data)
    let xScale = d3.scaleLinear().domain(ranges.x).range([margins.left, width + margins.left])
    let yScale = d3.scaleLinear().domain(ranges.y).range([margins.top + height, margins.top])

    console.log(xScale)

    let xAxisDiv = svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${height + margins.top})`)

    let yAxisDiv = svg.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', `translate(${margins.left}, 0)`)

    let xAxis = d3.axisBottom(xScale).tickFormat(d3.format('.2f'))
    xAxisDiv.transition().duration(200).call(xAxis)

    let yAxis = d3.axisLeft(yScale).tickFormat(d3.format('.2f'))
    yAxisDiv.transition().duration(200).call(yAxis)

    // Plot line
    let line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))

    svg.append('path')
      .attr('class', 'line')
      .datum(data)
      .transition()
      .duration(200)
      .attr('d', line)

    let circles = svg.selectAll('.point')
        .data(data)

    circles.enter().append('circle')
      .merge(circles)
      .attr('class', 'point')
      .transition(200)
      .ease(d3.easeQuadOut)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 6)
  }
}
