import * as d3 from 'd3'

export default class Tooltip {
  constructor (target, cfg) {
    this.div = d3.select(target).append('div')
      .attr('class', 'tufte-tooltip')
      .style('display', 'none')

    this.offset = {
      right: { x: 15, y: 15 },
      left: { x: -150 - 15, y: 15 }
    }
  }

  show () {
    this.div.style('display', null)
  }

  hide () {
    this.div.style('display', 'none')
  }

  move (position, direction = 'right') {
    this.div
      .style('top', (position.y + this.offset[direction].y) + 'px')
      .style('left', (position.x + this.offset[direction].x) + 'px')
  }

  render (data) {
    this.div.html(data)
  }
}
