import { D3CANVAS, Point, POINT } from "./type"
// import * as d3 from 'd3'


const drawLine = (container: D3CANVAS, startPoint: POINT | Point, endPoints: Point[]) => {
  endPoints.forEach(item => {
    container?.insert('path', ':first-child')
      .attr('d', 'M ' + startPoint.x + ' ' + startPoint.y + ' L ' + item.x + ' ' + item.y)
      .attr('stroke', '#84ADF8')
      .attr('stroke-width', '1px')
  })
}

const drawRectLine = (container: D3CANVAS, startPoint: POINT, endPoint: Point) => {
  container?.insert('path', ':first-child')
    .attr('d', 'M ' + startPoint.x + ' ' + startPoint.y + ' L ' + endPoint.x + ' ' + endPoint.y)
    .attr('stroke', '#84ADF8')
    .attr('stroke-width', '1px')
}

const drawHorizontalLine = (container: D3CANVAS, points: Point[]) => {
  container?.insert('path', ':first-child')
    .attr('d', 'M ' + points[0].x + ' ' + points[0].y + ' L ' + points[points.length - 1].x + ' ' + points[points.length - 1].y)
    .attr('stroke', '#84ADF8')
    .attr('stroke-width', '1px')
}

export { drawLine, drawRectLine, drawHorizontalLine }