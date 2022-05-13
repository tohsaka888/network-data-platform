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


export type DATA = {
  model: Entity[];
  centerPoint: Entity[];
  defaultPoint: Entity[];
  datameta: Entity[];
  codeInfo: Entity[];
  terminology: Entity[];
  property: Entity[];
  assetField: Entity[];
}