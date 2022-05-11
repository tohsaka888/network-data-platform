// 画布相关
import * as d3 from 'd3'
import { D3CANVAS } from './type';

function dragStart(this: SVGSVGElement, event: any) {
  d3.select(this).style('cursor', 'grabbing');
}

function dragEnd(this: SVGSVGElement, event: any) {

}

const createCanvas = (canvas: HTMLDivElement, canvasDragEvent: (this: SVGSVGElement, event: any) => void): D3CANVAS => {
  const svgContainer = d3.select(canvas).append('svg').style('width', '100%').style('height', '100%')
  const container = svgContainer.append('g').attr('transform', 'translate(0, 0)')

  svgContainer.call(d3.drag<SVGSVGElement, unknown>().on('start', dragStart).on('drag', canvasDragEvent).on('end', dragEnd))
  return container
}


export { createCanvas }