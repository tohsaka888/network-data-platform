import * as d3 from "d3"
import { EDGE, D3CANVAS, Entity } from "../type"

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
  let isDraw = false
  edges = Array.from(new Set(edges))
  edges.forEach(item => {
    let id = ''
    item.showArraw = true
    if (!item.fromId) {
      item.fromId = 'null'
    }
    if (!item.toId) {
      item.toId = 'null'
    }
    let fromX = container?.select('#id' + item.fromId).attr('x') || 0
    let fromY = container?.select('#id' + item.fromId).attr('y') || 0
    let toX = container?.select('#id' + item.toId).attr('x') || 0
    let toY = container?.select('#id' + item.toId).attr('y') || 0

    if (item.fromId.includes('asset') && !item.fromId.includes('field') && item.toId.includes('asset_field')) {
      item.isDraw = isDraw
      if (!isDraw) {
        toX = container?.select('#id' + item.toId).attr('fieldX') || 0
        toY = +toY + 19
        isDraw = true
      }
    } else if (item.fromId.includes('asset_field') && item.toId.includes('property')) {
      fromX = +fromX + 40
      fromY = + fromY + 38
      toX = +toX + 40
      id = 'show'
      item.showArraw = false
    } else if (item.fromId.includes('asset_field') && (item.toId.includes('terminology') || item.toId.includes('codeinfo') || item.toId.includes('data_meta'))) {
      fromX = +fromX + 40
      fromY = + fromY
      toX = +toX + 40
      toY = +toY + 38
      id = 'show'
      item.showArraw = false
    } else if (item.fromId.includes('model') && item.toId.includes('property')) {
      toX = +toX + 40
      toY = + toY + 38
    }
    let midX = (+fromX + +toX) / 2
    let midY = (+fromY + +toY) / 2

    if (!item.isDraw && item.showArraw) {
      container?.insert('path', ':first-child')
        .attr('d', 'M ' + fromX + ' ' + fromY + ' L ' + midX + ' ' + midY + ' L ' + toX + ' ' + toY)
        .attr('stroke', '#84ADF8')
        .attr('stroke-width', '1px')
        .attr('marker-mid', 'url(#arrow)')
        .classed(id, true)
    }

    if (!item.showArraw) {
      container?.insert('path', ':first-child')
        .attr('d', 'M ' + fromX + ' ' + fromY + ' L ' + toX + ' ' + toY)
        .attr('stroke', '#84ADF8')
        .attr('stroke-width', '1px')
        .classed(id, true)
    }
  })
}

const isShowLine = (isShow: boolean) => {
  d3.selectAll('.show').transition().style('display', isShow ? 'block' : 'none').duration(5000)
}

const drawStaticLine = (container: D3CANVAS, startPoint: Entity, endPoints: Entity[]) => {
  endPoints.forEach(item => {
    let midX
    let midY
    if (item.x && item.y && startPoint.x && startPoint.y) {
      midX = (startPoint.x + item.x) / 2
      midY = (startPoint.y + item.y) / 2
    }
    container?.insert('path', ':first-child')
      .attr('d', 'M ' + startPoint.x + ' ' + startPoint.y + ' L ' + midX + ' ' + midY + ' L ' + item.x + ' ' + item.y)
      .attr('stroke', '#84ADF8')
      .attr('stroke-width', '1px')
      .classed('show', true)
      .attr('marker-mid', 'url(#arrow)')
  })
}

export { drawLine, drawArraw, isShowLine, drawStaticLine }