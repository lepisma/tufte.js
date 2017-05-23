export default class AnnotationPatch {
  constructor (svg, bounds, text, config) {
    let cfg = Object.assign({ horizontal: true }, config)

    let textDiv = svg.append('text')
        .attr('class', 'annotation')
        .text(text)
        .attr('transform', `translate(${bounds.x}, ${bounds.y})`)

    if (cfg.horizontal) {
      textDiv
        .style('text-anchor', 'middle')
    } else {
      textDiv
        .style('text-anchor', 'end')
        .attr('dy', '1em')
        .attr('transform', textDiv.attr('transform') + ' rotate(-90)')
    }
  }
}
