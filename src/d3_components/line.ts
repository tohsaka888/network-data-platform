import * as d3 from "d3"
import { EDGE, D3CANVAS } from "../type"

const drawArraw = () => {
  d3.selectAll('svg').insert('defs', ':first-child')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 15')
    .attr('refX', '0')
    .attr('refY', '0')
    .attr('markerWidth', '10')
    .attr('markerHeight', '10')
    .attr('orient', 'auto')
    .attr('fill', '#84ADF8')
    .attr('markerUnits', 'strokeWidth')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
}

const drawLine = (container: D3CANVAS, edges: EDGE[]) => {
  edges.forEach(item => {
    let id = ''
    if (!item.fromId) {
      item.fromId = 'null'
    }
    if (!item.toId || item.toId === '000001002') {
      item.toId = 'null'
    }
    let fromX = container?.select('#id' + item.fromId).attr('x') || 0
    let fromY = container?.select('#id' + item.fromId).attr('y') || 0
    let toX = container?.select('#id' + item.toId).attr('x') || 0
    let toY = container?.select('#id' + item.toId).attr('y') || 0

    if (item.fromId.includes('asset') && !item.fromId.includes('field') && item.toId.includes('asset_field')) {
      toX = container?.select('#id' + item.toId).attr('fieldX') || 0
      toY = +toY + 50
    } else if (item.fromId.includes('asset_field') && item.toId.includes('property')) {
      fromX = +fromX + 12
      fromY = + fromY + 100
      toX = +toX + 12
      id = 'show'
    } else if (item.fromId.includes('asset_field') && (item.toId.includes('terminology') || item.toId.includes('codeinfo') || item.toId.includes('data_meta'))) {
      fromX = +fromX + 12
      fromY = + fromY
      toX = +toX + 12
      toY = +toY + 100
      id = 'show'
    } else if (item.fromId.includes('model') && item.toId.includes('property')) {
      toX = +toX + 12
      toY = + toY + 100
    }
    let midX = (+fromX + +toX) / 2
    let midY = (+fromY + +toY) / 2

    container?.insert('path', ':first-child')
      .attr('d', 'M ' + fromX + ' ' + fromY + ' L ' + midX + ' ' + midY + ' L ' + toX + ' ' + toY)
      .attr('stroke', '#84ADF8')
      .attr('stroke-width', '1px')
      .attr('marker-mid', 'url(#arrow)')
      .classed(id, true)
  })
}

const isShowLine = (isShow: boolean) => {
  d3.selectAll('.show').style('display', isShow ? 'block' : 'none')
}

// const drawRectLine = (container: D3CANVAS, startPoint: POINT, endPoint: Point) => {
//   let midX = null
//   let midY = null
//   if (startPoint.x && startPoint.y && endPoint.x && endPoint.y) {
//     midX = (+startPoint.x + endPoint.x) / 2
//     midY = (+startPoint.y + endPoint.y) / 2
//   }
//   container?.insert('path', ':first-child')
//     .attr('d', 'M ' + startPoint.x + ' ' + startPoint.y + ' L ' + midX + ' ' + midY + ' L ' + endPoint.x + ' ' + endPoint.y)
//     .attr('stroke', '#84ADF8')
//     .attr('stroke-width', '1px')
//     .attr('marker-mid', 'url(#arrow)')
// }

// const drawHorizontalLine = (container: D3CANVAS, points: Point[]) => {
//   container?.insert('path', ':first-child')
//     .attr('d', 'M ' + points[0].x + ' ' + points[0].y + ' L ' + points[points.length - 1].x + ' ' + points[points.length - 1].y)
//     .attr('stroke', '#84ADF8')
//     .attr('stroke-width', '1px')
// }

export { drawLine, drawArraw, isShowLine }