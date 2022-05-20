import { message } from "antd"
import { EDGE, Entity } from "../type"
import fake_data from './fake_data.json'

const formatData = (data: { entities: Entity[], edges: EDGE[] }) => {
  let centerPoint: Entity[] = []
  let model: Entity[] = []
  let defaultPoint: Entity[] = []
  let property: Entity[] = []
  let datameta: Entity[] = []
  let codeInfo: Entity[] = []
  let terminology: Entity[] = []
  let assetField: Entity[] = []
  data.entities.forEach((item: Entity) => {
    if (item.label === 'model') {
      model.push(item)
    } else if (item.label === 'asset') {
      centerPoint.push(item)
    } else if (item.label === 'property') {
      property.push(item)
    } else if (item.label === 'datameta') {
      datameta.push(item)
    } else if (item.label === 'codeinfo') {
      codeInfo.push(item)
    } else if (item.label === 'terminology') {
      terminology.push(item)
    } else if (item.label === 'assetfield') {
      assetField.push(item)
    } else {
      defaultPoint.push(item)
    }
  })
  return { model, centerPoint, defaultPoint, datameta, codeInfo, terminology, property, assetField, edges: data.edges }
}

export const getData = async () => {
  try {
    const res = await fetch(`http://172.168.30.12:8010/api/network/asset/getAssetGraph?id=6`)
    const data = await res.json()
    return formatData(data.data)
  } catch (error: any) {
    message.error(error.message)
    // fake_data.data.entities.forEach((item: any) => {
    //   if (item.id === null) {
    //     item.id = 'null'
    //   }
    // })
    return formatData(fake_data.data)
  }
}