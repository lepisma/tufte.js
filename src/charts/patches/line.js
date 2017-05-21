import * as d3 from 'd3'

export default class LinePatch {
  constructor (svg, bounds, data, config = { smooth: false }) {
    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .range([0, bounds.width])

    let yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y))
        .range([bounds.height, 0])

    let line = d3.line()
        .x(d => xScale(d.x) + bounds.x)
        .y(d => yScale(d.y) + bounds.y)

    if (config.smooth) {
      line = line.curve(d3.curveBasis)
    }

    svg.append('path')
      .attr('class', 'line')
      .datum(data)
      .transition()
      .duration(200)
      .attr('d', line)
  }
}
