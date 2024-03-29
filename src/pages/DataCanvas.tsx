import { Layout, Tag } from "antd";
import * as d3 from "d3";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import HiddenArea from "../components/HiddenArea";
import SelectArea from "../components/SelectArea";
import { createCanvas } from "../d3_components/canvas";
import { drawArraw, drawLine, drawStaticLine } from "../d3_components/line";
import {
  createPoint,
  createPointInfo,
  createRect,
} from "../d3_components/point";
import { D3CANVAS } from "../type";
import { DATA } from "../type";
import { CanvasArea, MainCanvas, TypeArea } from "./DataCancas.style";

type Props = {
  screenWidth: number;
  screenHeight: number;
  rectWidth: number;
  rectHeight: number;
} & DATA;

function DataCanvas({
  screenWidth,
  screenHeight,
  model,
  centerPoint,
  codeInfo,
  terminology,
  datameta,
  property,
  assetField,
  defaultPoint,
  edges,
  rectHeight,
  rectWidth,
}: Props) {
  const { Content } = Layout;

  const canvasRef = useRef<HTMLDivElement>();
  const containerRef = useRef<D3CANVAS>();
  const containerWidth = screenWidth - 248;
  const containerHeight = screenHeight - 64 - 64 - 40 - 16 - 54;
  const unitY = (rectHeight / containerHeight) * 100;
  const unitX = (rectWidth / containerWidth) * 100;
  const [size, setSize] = useState<number>(1);
  const showButtonRef = useRef<D3CANVAS>();
  const [show, setShow] = useState<boolean>(false);
  const canvasDragEvent = useCallback(function (
    this: SVGSVGElement,
    event: any
  ) {
    const tempArr = containerRef.current?.attr("transform").split(",");
    const x = +(tempArr?.[0]?.split("(")[1] || 0);
    const y = +(tempArr?.[1]?.split(")")[0] || 0);
    containerRef.current?.attr(
      "transform",
      `translate(${x + event.dx}, ${y + event.dy})`
    );
  },
  []);

  const startPoint = useMemo(
    () => ({
      x: 0.2 * containerWidth,
      y: 0.5 * containerHeight,
      initX: 20,
      initY: 50,
    }),
    [containerHeight, containerWidth]
  );

  const createDefaultPoints = useCallback(() => {
    let initX = startPoint.initX - 10;
    let initY = 8;
    let unit = 100 / (defaultPoint.length || 0);
    defaultPoint?.forEach((item) => {
      let x = (initX / 100) * containerWidth;
      let y = (initY / 100) * containerHeight;
      createPoint(containerRef.current, x, y, "#3276F3", item, edges);
      if (item.label.length > 4) {
        item.label = item.label.slice(0, 3) + "...";
      }
      createPointInfo(containerRef.current, x, y, item);
      createPointInfo(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight + 35,
        item,
        "#000",
        true
      );
      item.x = (initX / 100) * containerWidth;
      item.y = (initY / 100) * containerHeight;
      initY += unit;
    });
  }, [containerHeight, containerWidth, defaultPoint, edges, startPoint.initX]);

  const createFields = useCallback(() => {
    let initX = startPoint.initX + 10;
    let initY = startPoint.initY - unitY / 2;
    showButtonRef.current = createPoint(
      containerRef.current,
      (initX / 100) * containerWidth,
      startPoint.y,
      "#3276F3",
      {
        name: "字段",
        id: "field",
        label: "字段",
      },
      edges
    );
    createPointInfo(
      containerRef.current,
      (initX / 100) * containerWidth,
      startPoint.y,
      {
        name: "字段",
        id: "field",
        label: "字段",
      }
    );
    createPointInfo(
      containerRef.current,
      (initX / 100) * containerWidth,
      startPoint.y + 35,
      {
        name: "字段",
        id: "field",
        label: "",
      },
      "#000"
    );
    drawStaticLine(
      containerRef.current,
      {
        x: (initX / 100) * containerWidth,
        y: startPoint.y,
        label: "",
        name: "",
        id: "assets",
      },
      [
        {
          x: ((initX + unitX) / 100) * containerWidth,
          y: startPoint.y,
          label: "",
          name: "",
          id: assetField[0].id,
        },
      ]
    );
    setShow(true);
    initX += unitX;
    assetField?.forEach((item) => {
      createRect(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "rect-purple",
        item,
        edges,
        ((startPoint.initX + 10) / 100) * containerWidth
      );
      item.x = (initX / 100) * containerWidth;
      item.y = (initY / 100) * containerHeight + 50;
      initX += unitX;
    });
  }, [
    startPoint.initX,
    startPoint.initY,
    startPoint.y,
    unitY,
    containerWidth,
    edges,
    unitX,
    assetField,
    containerHeight,
  ]);

  const createCodeInfo = useCallback(
    (initX: number, initY: number) => {
      initX += unitX;
      datameta.forEach((item) => {
        createRect(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          "rect-blue",
          item,
          edges
        );
        item.x = (initX / 100) * containerWidth + rectWidth / 2;
        item.y = (initY / 100) * containerHeight;
        initX += unitX;
      });
      return initX;
    },
    [containerHeight, containerWidth, datameta, edges, rectWidth, unitX]
  );

  const createDataMeta = useCallback(
    (x: number, y: number) => {
      let initX = x + unitX;
      let initY = y;
      codeInfo.forEach((item) => {
        createRect(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          "rect-green",
          item,
          edges
        );
        item.x = (initX / 100) * containerWidth + rectWidth / 2;
        item.y = (initY / 100) * containerHeight;
        initX += unitX;
      });
      return initX;
    },
    [codeInfo, containerHeight, containerWidth, edges, rectWidth, unitX]
  );

  const createTerminology = useCallback(() => {
    let initX = startPoint.initX + 5;
    let initY = startPoint.initY - 1.5 * unitX - 12;
    terminology.forEach((item) => {
      createRect(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "rect-blue",
        item,
        edges
      );
      item.x = (initX / 100) * containerWidth + rectWidth / 2;
      item.y = (initY / 100) * containerHeight;
      initX += unitX;
    });
    let dataInitX = createCodeInfo(initX + 5, initY);
    createDataMeta(dataInitX + 5, initY);
  }, [
    containerHeight,
    containerWidth,
    createCodeInfo,
    createDataMeta,
    edges,
    rectWidth,
    startPoint.initX,
    startPoint.initY,
    terminology,
    unitX,
  ]);

  const createModelFields = useCallback(
    (initX = startPoint.initX + 10) => {
      let initY = startPoint.initY + unitY / 2 + 12;
      property.forEach((item) => {
        createRect(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          "rect-blue",
          item,
          edges
        );
        item.x = (initX / 100) * containerWidth + 12;
        item.y = (initY / 100) * containerHeight + 100;
        initX += unitX;
      });
      return initX + unitX;
    },
    [
      containerHeight,
      containerWidth,
      edges,
      property,
      startPoint.initX,
      startPoint.initY,
      unitX,
      unitY,
    ]
  );

  // 创建model
  const createModel = useCallback(() => {
    let propertyX = startPoint.initX + 10;
    let initY = startPoint.initY + 2 * unitY + 24;
    let initX = propertyX + unitX;
    model.forEach((item) => {
      initX = propertyX + unitX * (property.length / 2);
      createPoint(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "#3276F3",
        item,
        edges
      );
      createPointInfo(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        item
      );
      createPointInfo(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight + 35,
        item,
        "#000",
        true
      );
      item.x = (initX / 100) * containerWidth;
      item.y = (initY / 100) * containerHeight;
      propertyX = createModelFields(propertyX);
    });
    return { initX, initY, propertyX };
  }, [
    containerHeight,
    containerWidth,
    createModelFields,
    edges,
    model,
    property.length,
    startPoint.initX,
    startPoint.initY,
    unitX,
    unitY,
  ]);

  const createTerm = useCallback(() => {
    // let propertyX = startPoint.initX;
    let initY = startPoint.initY - 3 * unitY - 24;
    let initX = startPoint.initX + 5;

    createPoint(
      containerRef.current,
      (initX / 100) * containerWidth + (rectWidth / 2) * terminology.length,
      (initY / 100) * containerHeight,
      "#3276F3",
      {
        name: "术语",
        id: "term",
        label: "术语",
      },
      edges
    );
    drawStaticLine(
      containerRef.current,
      {
        x:
          (initX / 100) * containerWidth + (rectWidth / 2) * terminology.length,
        y: (initY / 100) * containerHeight,
        label: "",
        name: "",
        id: "term",
      },
      terminology
    );
    createPointInfo(
      containerRef.current,
      (initX / 100) * containerWidth + (rectWidth / 2) * terminology.length,
      (initY / 100) * containerHeight,
      {
        name: "术语",
        id: "term",
        label: "术语",
      }
    );
    createPointInfo(
      containerRef.current,
      (initX / 100) * containerWidth + (rectWidth / 2) * terminology.length,
      (initY / 100) * containerHeight + 35,
      {
        name: "术语",
        id: "model",
        label: "术语",
      },
      "#000"
    );
    initX += unitX * terminology.length + 5 + unitX;
    return { initX, initY };
  }, [
    containerHeight,
    containerWidth,
    edges,
    rectWidth,
    startPoint.initX,
    startPoint.initY,
    terminology,
    unitX,
    unitY,
  ]);

  const createData = useCallback(
    (initX: number, initY: number) => {
      initX += (unitX * datameta.length) / 2;
      createPoint(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "#3276F3",
        {
          name: "数据元",
          id: "code",
          label: "数据元",
        },
        edges
      );
      drawStaticLine(
        containerRef.current,
        {
          x: (initX / 100) * containerWidth,
          y: (initY / 100) * containerHeight,
          label: "",
          name: "",
          id: "",
        },
        datameta
      );
      createPointInfo(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        {
          name: "数据元",
          id: "code",
          label: "数据元",
        }
      );
      createPointInfo(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight + 35,
        {
          name: "数据元",
          id: "code",
          label: "数据元",
        },
        "#000"
      );
      initX += unitX * datameta.length / 2 + 5 + unitX;
      return { initX, initY };
    },
    [containerHeight, containerWidth, datameta, edges, unitX]
  );


  const createCode = useCallback(
    (initX: number, initY: number) => {
      initX += (unitX * codeInfo.length) / 2;
      createPoint(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "#3276F3",
        {
          name: "代码",
          id: "data",
          label: "代码",
        },
        edges
      );
      drawStaticLine(
        containerRef.current,
        {
          x: (initX / 100) * containerWidth,
          y: (initY / 100) * containerHeight,
          label: "",
          name: "",
          id: "",
        },
        codeInfo
      );
      createPointInfo(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        {
          name: "代码",
          id: "data",
          label: "代码",
        }
      );
      createPointInfo(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight + 35,
        {
          name: "代码",
          id: "data",
          label: "代码",
        },
        "#000"
      );

      return { initX, initY };
    },
    [codeInfo, containerHeight, containerWidth, edges, unitX]
  );

  // rerender时清空画布
  useEffect(() => {
    containerRef.current?.selectAll("*").remove();
  }, [containerHeight, containerWidth]);

  // 创建画布
  useEffect(() => {
    if (canvasRef.current) {
      containerRef.current = createCanvas(canvasRef.current, canvasDragEvent);
    }
  }, [canvasDragEvent]);

  // 画点
  useEffect(() => {
    if (centerPoint) {
      createPoint(
        containerRef.current,
        startPoint.x,
        startPoint.y,
        "#ED7D0C",
        centerPoint[0],
        edges
      );
      createPointInfo(
        containerRef.current,
        startPoint.x,
        startPoint.y,
        centerPoint[0]
      );
      createPointInfo(
        containerRef.current,
        startPoint.x,
        startPoint.y + 35,
        centerPoint[0],
        "#000",
        true
      );
      createDefaultPoints();
      createFields();
      createTerminology();
      createModel();
      let prop = createTerm();
      prop = createData(prop.initX, prop.initY);
      createCode(prop.initX, prop.initY);
    }
  }, [
    createFields,
    createTerminology,
    startPoint.x,
    startPoint.y,
    createModel,
    centerPoint,
    createDefaultPoints,
    createCode,
    createTerm,
    createData,
    edges,
  ]);

  // 画线
  useEffect(() => {
    drawLine(containerRef.current, edges);
  }, [edges, containerHeight, containerWidth]);

  useEffect(() => {
    drawArraw();
  }, []);

  useEffect(() => {
    d3.selectAll("svg").select("g").attr("transform", `scale(${size})`);
  }, [size]);
  return (
    <Content style={{ padding: "0px 24px" }}>
      <SelectArea />
      <MainCanvas height={window.innerHeight - 128 - 64}>
        <TypeArea>
          <Tag color={"green"} style={{ padding: "3px 8px" }}>
            部门: <span style={{ marginLeft: "8px" }}>1</span>
          </Tag>
        </TypeArea>
        <CanvasArea
          ref={(ref) => {
            if (ref) {
              canvasRef.current = ref;
            }
          }}
          onWheel={(e) => {
            if (e.deltaY > 0) {
              setSize(size - 0.1);
            } else {
              setSize(size + 0.1);
            }
          }}
        />
      </MainCanvas>
      {show && <HiddenArea showButton={showButtonRef} />}
    </Content>
  );
}

export default DataCanvas;
