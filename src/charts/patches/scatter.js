import * as d3 from 'd3'
import * as utils from '../utils'
import Tooltip from '../../tooltip'

export class ScatterPatch {
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

export class ScatterPatchCanvas {
  constructor (svg, bounds, data, cfg) {
    this.xScale = utils.getScale(
      data.map(d => d.x),
      cfg.scaleType.x,
      [0, bounds.width]
    )
    this.yScale = utils.getScale(
      data.map(d => d.y),
      cfg.scaleType.y,
      [bounds.height, 0]
    )

    let parent = d3.select(svg.node().parentNode)
    // HACK: Might affect experience
    parent.style('position', 'relative')

    // Extra space on the sides to make up for edge cases
    this.spacing = {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5
    }

    this.canvas = parent.append('canvas')
      .attr('width', bounds.width + this.spacing.left + this.spacing.right)
      .attr('height', bounds.height + this.spacing.top + this.spacing.bottom)
      .style('position', 'absolute')
      .style('left', (bounds.x - this.spacing.left) + 'px')
      .style('top', (bounds.y - this.spacing.top) + 'px')

    this.drawCircles(data, parseInt(cfg.r))
  }

  drawCircles (data, radius) {
    let context = this.canvas.node().getContext('2d')

    context.beginPath()
    data.forEach(d => {
      let point = [
        this.xScale(d.x) + this.spacing.left,
        this.yScale(d.y) + this.spacing.top
      ]
      context.moveTo(point[0], point[1])
      context.arc(point[0], point[1], radius, 0, 2 * Math.PI)
    })

    context.fillStyle = '#000'
    context.fill()
  }
}
