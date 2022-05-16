export type D3CANVAS = d3.Selection<SVGGElement, unknown, null, undefined> | undefined
export type POINT = {
  x: number | string;
  y: number | string;
  pointId?: string;
}
export type Point = {
  name: string;
  id: string;
  x?: number;
  y?: number;
  property?: {
    name: string;
    id: string;
    x?: number;
    y?: number;
  }[]
}
