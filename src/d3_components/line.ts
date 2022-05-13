import * as d3 from "d3"
import { D3CANVAS, Point, POINT } from "./type"
// import * as d3 from 'd3'

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

const drawLine = (container: D3CANVAS, startPoint: POINT | Point, endPoints: Point[]) => {
  endPoints.forEach(item => {
    let midX = null
    let midY = null
    if (startPoint.x && startPoint.y && item.x && item.y) {
      midX = (+startPoint.x + item.x) / 2
      midY = (+startPoint.y + item.y) / 2
    }
    container?.insert('path', ':first-child')
      .attr('d', 'M ' + startPoint.x + ' ' + startPoint.y + ' L ' + midX + ' ' + midY + ' L ' + item.x + ' ' + item.y)
      .attr('stroke', '#84ADF8')
      .attr('stroke-width', '1px')
      .attr('marker-mid', 'url(#arrow)')
  })
}

const drawRectLine = (container: D3CANVAS, startPoint: POINT, endPoint: Point) => {
  let midX = null
    let midY = null
    if (startPoint.x && startPoint.y && endPoint.x && endPoint.y) {
      midX = (+startPoint.x + endPoint.x) / 2
      midY = (+startPoint.y + endPoint.y) / 2
    }
  container?.insert('path', ':first-child')
    .attr('d', 'M ' + startPoint.x + ' ' + startPoint.y + ' L ' + midX + ' ' + midY + ' L ' + endPoint.x + ' ' + endPoint.y)
    .attr('stroke', '#84ADF8')
    .attr('stroke-width', '1px')
    .attr('marker-mid', 'url(#arrow)')
}

const drawHorizontalLine = (container: D3CANVAS, points: Point[]) => {
  container?.insert('path', ':first-child')
    .attr('d', 'M ' + points[0].x + ' ' + points[0].y + ' L ' + points[points.length - 1].x + ' ' + points[points.length - 1].y)
    .attr('stroke', '#84ADF8')
    .attr('stroke-width', '1px')
}

export { drawLine, drawRectLine, drawHorizontalLine, drawArraw }