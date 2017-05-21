import * as d3 from 'd3'

export class XAxisPatch {
  constructor (svg, bounds, data) {
    let xAxisDiv = svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${bounds.y})`)

    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .range([bounds.x, bounds.width + bounds.x])

    let xAxis = d3.axisBottom(xScale)
    xAxisDiv.transition().duration(200).call(xAxis)
  }
}

export class YAxisPatch {
  constructor (svg, bounds, data) {
    let yAxisDiv = svg.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', `translate(${bounds.x}, 0)`)

    let yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y))
        .range([bounds.y + bounds.height, bounds.y])

    let yAxis = d3.axisLeft(yScale)
    yAxisDiv.transition().duration(200).call(yAxis)
  }
}
