import * as d3 from 'd3'

/**
 * Parse config to setup a few general things
 */
export function parseConfig (target, config) {
  let selection = d3.select(target)
      .attr('class', 'tufte-plot')

  let selectionBB = selection.node().getBoundingClientRect()
  let selectionHeight = (selectionBB.height === 0 ? 400 : selectionBB.height)
  let selectionWidth = selectionBB.width

  return Object.assign({
    height: selectionHeight,
    width: selectionWidth,
    margins: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  }, config)
}
