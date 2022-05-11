import { D3CANVAS } from "./type"

const createPoint = (container: D3CANVAS, x: string | number, y: string | number, color: string) => {
  const pointContainer = container?.append('g')
  pointContainer
    ?.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 30)
    .attr('fill', color)
}

const createRect = (container: D3CANVAS, x: string | number, y: string | number, color: string) => {
  const rectContainer = container?.append('g')
  rectContainer
    ?.append('rect')
    .attr('x', x)
    .attr('y', y)
    .attr('width', '4%')
    .attr('height', '15%')
    .attr('fill', color)
}

const createPointInfo = (container: D3CANVAS, x: string | number, y: string | number, info: string) => {
  container
    ?.append('text')
    .attr('x', x)
    .attr('y', y)
    .attr('font-size', '14px')
    .attr('font-weight', 'bold')
    .style('font-family', 'PingFang SC')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .attr('dominant-baseline', 'middle')
    .attr('fill', '#fff')
    .text(info)
}

const createRectInfo = (container: D3CANVAS, x: string | number, y: string | number, info: string) => {
  container
    ?.append('text')
    .attr('x', x)
    .attr('y', y)
    .attr('font-size', '14px')
    .attr('font-weight', 'bold')
    .attr("dominant-baseline", "central")
    .style('font-family', 'PingFang SC')
    .attr('fill', '#fff')
    .attr('writing-mode', 'tb')
    .attr('length-adjust', 'spacing')
    .text(info)
}

export { createPoint, createPointInfo, createRect, createRectInfo }