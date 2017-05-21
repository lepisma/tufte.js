import * as d3 from 'd3'

export default class ScatterPatch {
  constructor (svg, bounds, data, config) {
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
      .attr('data-x', d => d.x)
      .attr('data-y', d => d.y)

    svg.selectAll('circle')
      .on('mouseover', function () {
        let elem = d3.select(this)
        config.tooltip.show(`${parseFloat(elem.attr('data-x')).toFixed(2)}, ${parseFloat(elem.attr('data-y')).toFixed(2)}`)
      })
      .on('mouseout', () => config.tooltip.hide())
      .on('mousemove', () => {
        let [x, y] = d3.mouse(svg.node())
        let bb = svg.node().getBoundingClientRect()
        config.tooltip.move(x + bb.left, y + bb.top)
      })
  }
}
