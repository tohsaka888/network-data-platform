import { Point } from "../d3_components/type"

const centerPoint: Point = {
  name: '资产',
  id: '0',
  property: [{
    name: '表',
    id: '0'
  },
  {
    name: '系统',
    id: '1'
  },
  {
    name: '部门',
    id: '2'
  },
  {
    name: '库',
    id: '3'
  },
  {
    name: '资产',
    id: '4'
  },
  {
    name: '资产',
    id: '5'
  }, {
    name: '资产',
    id: '6'
  }]
}

const fields: Point[] = [
  {
    name: '男方姓名',
    id: '0'
  },
  {
    name: '女方姓名',
    id: '1'
  },
  {
    name: '男方身份证号',
    id: '2'
  },
  {
    name: '女方身份证号',
    id: '3'
  },
  {
    name: '婚姻登记日期',
    id: '4'
  },
  {
    name: '婚姻登记类型',
    id: '5'
  },
  {
    name: '婚姻登记机关',
    id: '6'
  },
  {
    name: '婚姻登记备注',
    id: '7'
  }, {
    name: '婚姻登记备注',
    id: '8'
  }, {
    name: '婚姻登记备注',
    id: '9'
  }, {
    name: '婚姻登记备注',
    id: '10'
  }
]

const terms: Point[] = [
  {
    name: '术语1',
    id: '0'
  }, {
    name: '术语2',
    id: '1'
  }, {
    name: '术语3',
    id: '2'
  }, {
    name: '术语4',
    id: '3'
  }, {
    name: '术语5',
    id: '4'
  }
]

// const dataFields: Point[] = [
//   {
//     name: '数据字段1',
//     id: '0',
//   }, {
//     name: '数据字段2',
//     id: '1',
//   }, {
//     name: '数据字段3',
//     id: '2'
//   }, {
//     name: '数据字段4',
//     id: '3'
//   }, {
//     name: '数据字段5',
//     id: '4'
//   }
// ]

const data: Point[] = [
  {
    name: '数据元1',
    id: '0',
    property: [{
      name: '数据字段1',
      id: '0'
    }, {
      name: '数据字段2',
      id: '1'
    }, {
      name: '数据字段3',
      id: '2'
    }, {
      name: '数据字段4',
      id: '3'
    }, {
      name: '数据字段5',
      id: '4'
    }]
  }, {
    name: '数据元2',
    id: '1',
    property: [{
      name: '数据字段1',
      id: '0'
    }, {
      name: '数据字段2',
      id: '1'
    }, {
      name: '数据字段3',
      id: '2'
    }, {
      name: '数据字段4',
      id: '3'
    }]
  }, {
    name: '数据元3',
    id: '2',
    property: [{
      name: '数据字段1',
      id: '0'
    }, {
      name: '数据字段2',
      id: '1'
    }, {
      name: '数据字段3',
      id: '2'
    }, {
      name: '数据字段4',
      id: '3'
    }]
  }
]

const codeTables: Point[] = [
  {
    name: '代码表1',
    id: '0'
  }, {
    name: '代码表2',
    id: '1'
  }, {
    name: '代码表3',
    id: '2'
  }, {
    name: '代码表4',
    id: '3'
  }
]

const models: Point[] = [
  {
    name: '模型1',
    id: '0',
    property: [
      {
        name: '模型属性1',
        id: '0'
      }, {
        name: '模型属性2',
        id: '1'
      }, {
        name: '模型属性3',
        id: '2'
      }, {
        name: '模型属性4',
        id: '3'
      }, {
        name: '模型属性5',
        id: '4'
      },{
        name: '模型属性6',
        id: '6'
      }, {
        name: '模型属性7',
        id: '7'
      }, {
        name: '模型属性8',
        id: '8'
      }, {
        name: '模型属性9',
        id: '9'
      }, {
        name: '模型属性10',
        id: '10'
      }
    ]
  }, {
    name: '模型2',
    id: '1',
    property: [
      {
        name: '模型属性1',
        id: '0'
      }, {
        name: '模型属性2',
        id: '1'
      }, {
        name: '模型属性3',
        id: '2'
      }, {
        name: '模型属性4',
        id: '3'
      }, {
        name: '模型属性5',
        id: '4'
      }, {
        name: '模型属性6',
        id: '6'
      }
    ]
  }, {
    name: '模型3',
    id: '2',
    property: [
      {
        name: '模型属性1',
        id: '0'
      }, {
        name: '模型属性2',
        id: '1'
      }, {
        name: '模型属性3',
        id: '2'
      }, {
        name: '模型属性4',
        id: '3'
      }, {
        name: '模型属性5',
        id: '4'
      }
    ]
  }
]

// const modelProperties: Point[] = 

export { centerPoint, fields, terms, data, codeTables, models }