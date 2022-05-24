import { Entity, D3CANVAS, EDGE } from "../type"
import { highLightLine } from "./line"

const animtedCircle = (pointerContainer: d3.Selection<SVGGElement, unknown, null, undefined> | undefined, isActive: boolean = false, isStop: boolean = false) => {
  const color = pointerContainer?.select('circle')?.attr('fill')
  let outerColor = color === '#3276F3' ? '#B6D0FF' : '#DEC0A2'
  if (pointerContainer) {
    pointerContainer.selectAll('circle')
      .transition().duration(1000)
      .attr('stroke', isActive ? outerColor : 'transparent')
      .attr('r', isActive ? '27px' : '25px')
      .on('end', () => {
        // eslint-disable-next-line no-param-reassign
        isActive = !isActive
        if (!isStop) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          animtedCircle(pointerContainer, isActive)
        }
      });
  }
}

const createPoint = (container: D3CANVAS, x: number, y: number, color: string, entity: Entity, edges: EDGE[]) => {
  if (entity) {
    const pointContainer = container
      ?.append('g')
      .attr('id', 'id' + entity.id || 'null')
      .attr('x', x)
      .attr('y', y)
      .on('mouseover', function () {
        highLightLine(container, edges, entity.id, true)
      })
      .on('mouseout', function () {
        highLightLine(container, edges, entity.id, false)
      })
    if (entity.id) {
      if (entity.id.includes('terminology')) {
        pointContainer?.classed('show', true)
      }
      if (entity.id.includes('model')) {
        pointContainer?.classed('show', true)
      }
      if (entity.id.includes('data')) {
        pointContainer?.classed('show', true)
      }
      if (entity.id.includes('code')) {
        pointContainer?.classed('show', true)
      }
    }
    pointContainer?.append('circle').attr('cx', x).attr('cy', y).attr('r', 25)
      .attr('fill', color)
      .attr('stroke', 'transparent')
      .attr('stroke-width', '5px')
      .on('mouseover', function () {
        animtedCircle(pointContainer, true)
      })
      .on('mouseout', function () {
        animtedCircle(pointContainer, false, true)
      });
    return pointContainer
  }

}

const createRect = (container: D3CANVAS, x: number, y: number, color: string, entity: Entity, edges: EDGE[], fieldX?: number,) => {
  if (entity) {
    const rectContainer = container
      ?.append('foreignObject')
      .attr('id', 'id' + entity.id || 'null')
      .attr('x', x)
      .attr('y', y)
      .attr('fieldX', fieldX || 0)
      .attr('width', '80px')
      .attr('height', '38px')
      .on('mouseover', function () {
        highLightLine(container, edges, entity.id, true)
      })
      .on('mouseout', function () {
        highLightLine(container, edges, entity.id, false)
      })
    if (entity.id) {
      if (entity.id.includes('asset_field')) {
        rectContainer?.classed('show', true)
      }
      if (entity.id.includes('codeinfo')) {
        rectContainer?.classed('show', true)
      }
      if (entity.id.includes('data_meta')) {
        rectContainer?.classed('show', true)
      }
      if (entity.id.includes('property')) {
        rectContainer?.classed('show', true)
      }
      if (entity.id.includes('terminology')) {
        rectContainer?.classed('show', true)
      }
    }
    rectContainer
      ?.append('xhtml:div')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml')
      .classed(color, true)
      .text(entity.name)
    return rectContainer
  }
}

const createPointInfo = (container: D3CANVAS, x: number, y: number, entity: Entity, color?: string, isLabel: boolean = false) => {
  if (entity) {
    const text = container
      ?.append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('font-size', '12px')
      // .attr('font-weight', 'bold')
      .style('font-family', 'PingFang SC')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('dominant-baseline', 'middle')
      .attr('fill', color || '#fff')
      .text(isLabel ? entity.name : entity.label)
    if (entity.id) {
      if (entity.id.includes('terminology')) {
        text?.classed('show', true)
      }
      if (entity.id.includes('model')) {
        text?.classed('show', true)
      }
      if (entity.id.includes('data')) {
        text?.classed('show', true)
      }
      if (entity.id.includes('code')) {
        text?.classed('show', true)
      }
    }
  }
}

// const createRectInfo = (container: D3CANVAS, x: string | number, y: string | number, info: string) => {
// container
//   ?.append('text')
//   .attr('x', x)
//   .attr('y', y)
//   .attr('font-size', '14px')
//   .attr('font-weight', 'bold')
//   .attr("dominant-baseline", "central")
//   .style('font-family', 'PingFang SC')
//   .attr('fill', '#fff')
//   .attr('writing-mode', 'tb')
//   .attr('length-adjust', 'spacing')
//   .text(info)
// }

export { createPoint, createPointInfo, createRect }