import * as d3 from "d3"
import { D3CANVAS, Point, POINT } from "./type"
// import * as d3 from 'd3'

let arrowSvg: any = null

const drawArraw = (container: D3CANVAS) => {
  arrowSvg =  container?.insert('defs', ':first-child')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 12')
    .attr('refX', 10)
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
    arrowSvg?.append('path')
      .attr('d', 'M ' + startPoint.x + ' ' + startPoint.y + ' L ' + item.x + ' ' + item.y)
      .attr('stroke', '#84ADF8')
      .attr('stroke-width', '1px')
      .attr('marker-end', 'url(#arrow)')
  })
}

const drawRectLine = (container: D3CANVAS, startPoint: POINT, endPoint: Point) => {
  if (startPoint) {
    arrowSvg?.append('path')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 20 12')
      .attr('refX', (endPoint.x || 0 - +(startPoint.x || 0)) * 0.1)
      .attr('refY', '0')
      .attr('markerWidth', '10')
      .attr('markerHeight', '10')
      .attr('orient', 'auto')
      .attr('fill', '#84ADF8')
      .attr('markerUnits', 'strokeWidth')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
  }
  arrowSvg?.append('path')
    .attr('d', 'M ' + startPoint.x + ' ' + startPoint.y + ' L ' + endPoint.x + ' ' + endPoint.y)
    .attr('stroke', '#84ADF8')
    .attr('stroke-width', '1px')
    .attr('marker-end', 'url(#arrow)')
}

const drawHorizontalLine = (container: D3CANVAS, points: Point[]) => {
  container?.insert('path', ':first-child')
    .attr('d', 'M ' + points[0].x + ' ' + points[0].y + ' L ' + points[points.length - 1].x + ' ' + points[points.length - 1].y)
    .attr('stroke', '#84ADF8')
    .attr('stroke-width', '1px')
}

export { drawLine, drawRectLine, drawHorizontalLine, drawArraw }