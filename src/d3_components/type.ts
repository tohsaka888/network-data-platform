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
