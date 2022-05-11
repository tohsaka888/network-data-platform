import { D3CANVAS, POINT } from "./type"
import * as d3 from 'd3'


const drawLine = (container: D3CANVAS, startPoint: POINT, endPoints: POINT[]) => {
  endPoints.forEach(item => {
    container?.insert('path', ':first-child')
      .attr('d', 'M ' + startPoint.x + ' ' + startPoint.y + ' L ' + item.x + ' ' + item.y)
      .attr('stroke', '#84ADF8')
      .attr('stroke-width', '1px')
  })
}

export { drawLine }