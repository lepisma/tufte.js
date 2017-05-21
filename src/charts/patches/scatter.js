import * as d3 from 'd3'

export default class ScatterPatch {
  constructor (svg, bounds, data, tooltip) {
    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .range([0, bounds.width])

    let yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y))
        .range([bounds.height, 0])

    let circles = svg.selectAll('.point')
        .data(data)

    circles.enter().append('circle')
      .merge(circles)
      .attr('class', 'point')
      .transition(200)
      .ease(d3.easeQuadOut)
      .attr('cx', d => xScale(d.x) + bounds.x)
      .attr('cy', d => yScale(d.y) + bounds.y)
      .attr('r', '6px')

    circles.enter().append('cir')
  }
}
