import { Layout, Tag } from "antd";
// import * as d3 from "d3";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import SelectArea from "../components/SelectArea";
import { createCanvas } from "../d3_components/canvas";
import {
  drawArraw,
  // drawHorizontalLine,
  drawLine,
} from "../d3_components/line";
import {
  createPoint,
  createPointInfo,
  createRect,
} from "../d3_components/point";
import { D3CANVAS } from "../d3_components/type";
import { DATA } from "../type";
// import { Entity } from "../mock/getData";
import { CanvasArea, MainCanvas, TypeArea } from "./DataCancas.style";

type Props = {
  screenWidth: number;
  screenHeight: number;
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
}: Props) {
  const { Content } = Layout;

  const canvasRef = useRef<HTMLDivElement>();
  const containerRef = useRef<D3CANVAS>();
  const containerWidth = screenWidth - 248;
  const containerHeight = screenHeight - 64 - 64 - 40 - 16 - 54;
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
      y: 0.3 * containerHeight + 50,
    }),
    [containerHeight, containerWidth]
  );

  const createDefaultPoints = useCallback(() => {
    let initX = 5;
    let initY = 5;
    let unit = 100 / (defaultPoint.length || 0);
    defaultPoint?.forEach((item) => {
      let x = (initX / 100) * containerWidth;
      let y = (initY / 100) * containerHeight;
      createPoint(containerRef.current, x, y, "#3276F3", item);
      createPointInfo(containerRef.current, x, y, item);
      createPointInfo(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight + 30,
        item,
        "#000"
      );
      item.x = (initX / 100) * containerWidth;
      item.y = (initY / 100) * containerHeight;
      initY += unit;
    });
  }, [containerHeight, containerWidth, defaultPoint]);

  const createFields = useCallback(() => {
    let initX = 30;
    let initY = 30;
    assetField?.forEach((item) => {
      createRect(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "rect-purple",
        item,
        0.3 * containerWidth
      );
      item.x = (initX / 100) * containerWidth;
      item.y = (initY / 100) * containerHeight + 50;
      // if (item.name.length > 4) {
      //   item.name = item.name.slice(0, 3) + "...";
      // }
      // createRectInfo(
      //   containerRef.current,
      //   initX + 2 + "%",
      //   initY + 2 + "%",
      //   item.name
      // );
      initX += (24 * 100) / containerWidth;
    });
  }, [containerHeight, containerWidth, assetField]);

  const createCodeInfo = useCallback(
    (x: number, y: number) => {
      let initX = x + (24 * 100) / containerWidth;
      let initY = y;
      console.log(codeInfo);
      codeInfo.forEach((item) => {
        createRect(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          "rect-green",
          item
        );
        item.x = (initX / 100) * containerWidth;
        item.y = (initY / 100) * containerHeight + 50;
        initX += (24 * 100) / containerWidth;
      });
      return initX;
    },
    [codeInfo, containerHeight, containerWidth]
  );

  const createDataMeta = useCallback(
    (initX: number, initY: number) => {
      initX += (24 * 100) / containerWidth;
      datameta.forEach((item) => {
        createRect(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          "rect-blue",
          item
        );
        item.x = (initX / 100) * containerWidth;
        item.y = (initY / 100) * containerHeight + 50;
        initX += (24 * 100) / containerWidth;
      });
    },
    [containerHeight, containerWidth, datameta]
  );

  const createTerminology = useCallback(() => {
    let initX = 30;
    let initY = 5;
    terminology.forEach((item) => {
      createRect(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "rect-blue",
        item
      );
      item.x = (initX / 100) * containerWidth;
      item.y = (initY / 100) * containerHeight + 50;
      // createRectInfo(
      //   containerRef.current,
      //   initX + 2 + "%",
      //   initY + 2 + "%",
      //   item.name
      // );
      initX += (24 * 100) / containerWidth;
    });
    let dataInitX = createCodeInfo(initX, initY);
    createDataMeta(dataInitX, initY);
  }, [
    containerHeight,
    containerWidth,
    createCodeInfo,
    createDataMeta,
    terminology,
  ]);

  const createModelFields = useCallback(
    (initX = 30) => {
      let initY = 55;
      property.forEach((item) => {
        createRect(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          "rect-blue",
          item
        );
        item.x = (initX / 100) * containerWidth + 12;
        item.y = (initY / 100) * containerHeight + 100;
        // createRectInfo(
        //   containerRef.current,
        //   initX + 2 + "%",
        //   initY + 2 + "%",
        //   item.name
        // );
        initX += (24 * 100) / containerWidth;
      });
      return initX + (24 * 100) / containerWidth;
    },
    [containerHeight, containerWidth, property]
  );

  // 创建model
  const createModel = useCallback(() => {
    let propertyX = 30;
    let initY = 85;
    let initX = propertyX + (24 * 100) / containerWidth;
    model.forEach((item) => {
      initX = propertyX + ((24 * 100) / containerWidth) * (property.length / 2);
      createPoint(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "#3276F3",
        item
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
        (initY / 100) * containerHeight + 30,
        item,
        "#000"
      );
      item.x = (initX / 100) * containerWidth;
      item.y = (initY / 100) * containerHeight;
      propertyX = createModelFields(propertyX);
      // drawRectLine(containerRef.current, startPoint, datametaFields[0]);
      // drawHorizontalLine(containerRef.current, datametaFields);
      // drawLine(containerRef.current, item, item.childEntities || []);
    });
    return { initX, initY, propertyX };
    // createDatameta(initX, initY);
    // createDatametaProperties(propertyX, 55);
  }, [
    containerHeight,
    containerWidth,
    createModelFields,
    model,
    property.length,
  ]);

  useEffect(() => {
    containerRef.current?.selectAll("*").remove();
  }, [containerHeight, containerWidth]);

  useEffect(() => {
    if (canvasRef.current) {
      containerRef.current = createCanvas(canvasRef.current, canvasDragEvent);
    }
  }, [canvasDragEvent]);

  useEffect(() => {
    if (centerPoint) {
      createPoint(
        containerRef.current,
        startPoint.x,
        startPoint.y,
        "#ED7D0C",
        centerPoint[0]
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
        startPoint.y + 30,
        centerPoint[0],
        "#000"
      );
      createDefaultPoints();
      createFields();
      createTerminology();
      createModel();
      // createDatameta(pos.initX, pos.initY, pos.propertyX);
    }
  }, [
    createFields,
    createTerminology,
    startPoint.x,
    startPoint.y,
    createModel,
    centerPoint,
    createDefaultPoints,
  ]);

  useEffect(() => {
    drawLine(containerRef.current, edges);
  }, [edges, containerHeight, containerWidth]);

  useEffect(() => {
    drawArraw();
  }, []);
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
        />
      </MainCanvas>
    </Content>
  );
}

export default DataCanvas;
