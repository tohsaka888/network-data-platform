export type D3CANVAS = d3.Selection<SVGGElement, unknown, null, undefined> | undefined

export type Entity = {
  id: string;
  name: string;
  label: string;
  x?: number;
  y?: number;
  childEntities?: {
    id: string;
    name: string;
    label: string;
    x?: number;
    y?: number;
  }[]
}

export type EDGE = {
  fromId: string;
  toId: string;
  name: string | null;
  isDraw?: boolean;
  showArraw?: boolean;
}

export type DATA = {
  model: Entity[];
  centerPoint: Entity[];
  defaultPoint: Entity[];
  datameta: Entity[];
  codeInfo: Entity[];
  terminology: Entity[];
  property: Entity[];
  assetField: Entity[];
  edges: EDGE[];
}

export type ShowButton = d3.Selection<SVGForeignObjectElement, unknown, null, undefined> | undefined