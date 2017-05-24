export default class Tooltip {
  constructor (d3Selection) {
    this.div = d3Selection.append('div')
      .attr('class', 'tufte-tooltip')
      .style('display', 'none')
    this.offset = 15
    this.div.text('undefined')
  }

  get width () {
    return Math.max(this.selection.node().getBoundingClientRect().width, 50)
  }

  show (data) {
    this.div.text(data)
    this.div.style('display', null)
  }

  hide () {
    this.div.style('display', 'none')
  }

  move (x, y) {
    this.div
      .style('top', (y + this.offset) + 'px')
      .style('left', (x + this.offset) + 'px')
  }
}
