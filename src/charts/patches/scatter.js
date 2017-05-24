import * as d3 from 'd3'
import * as utils from '../utils'
import Tooltip from '../../tooltip'

export default class ScatterPatch {
  constructor (svg, bounds, data, cfg) {
    let xScale = utils.getScale(
      cfg.scaleType.x,
      data.map(d => d.x),
      [0, bounds.width]
    )
    let yScale = utils.getScale(
      cfg.scaleType.y,
      data.map(d => d.y),
      [bounds.height, 0]
    )

    let patchGroup = svg.append('g')

    let circles = patchGroup.selectAll('.point')
        .data(data)

    circles.enter().append('circle')
      .merge(circles)
      .attr('class', 'point')
      .transition(200)
      .ease(d3.easeQuadOut)
      .attr('cx', d => xScale(d.x) + bounds.x)
      .attr('cy', d => yScale(d.y) + bounds.y)
      .attr('r', cfg.r)
      .attr('data-x', d => d.x)
      .attr('data-y', d => d.y)

    // Add tooltip to circles
    if (cfg.tooltip) {
      let tooltip = new Tooltip(d3.select(svg.node().parentNode))
      patchGroup.selectAll('circle')
        .on('mouseover', function () {
          let elem = d3.select(this)
          tooltip.show(`${parseFloat(elem.attr('data-x')).toFixed(2)}, ${parseFloat(elem.attr('data-y')).toFixed(2)}`)
        })
        .on('mouseout', () => tooltip.hide())
        .on('mousemove', () => {
          let [x, y] = d3.mouse(svg.node())
          let bb = svg.node().getBoundingClientRect()
          tooltip.move(x + bb.left, y + bb.top)
        })
    }
  }
}
