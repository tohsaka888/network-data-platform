import { Layout, Tag } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import SelectArea from "../components/SelectArea";
import { createCanvas } from "../d3_components/canvas";
import { drawLine } from "../d3_components/line";
import {
  createPoint,
  createPointInfo,
  createRect,
  // createRectInfo,
} from "../d3_components/point";
import { D3CANVAS } from "../d3_components/type";
import {
  centerPoint,
  codeTables,
  data,
  dataFields,
  defaultPoint,
  fields,
  modelProperties,
  models,
  terms,
} from "../mock/fake_data";
import { CanvasArea, MainCanvas, TypeArea } from "./DataCancas.style";

function DataCanvas() {
  const { Content } = Layout;
  const canvasRef = useRef<HTMLDivElement>();
  const containerRef = useRef<D3CANVAS>();
  const containerWidth = window.innerWidth - 248;
  const containerHeight = window.innerHeight - 64 - 64 - 40 - 16 - 54;
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

  const createDefaultPoints = useCallback(() => {
    let initX = 5;
    let initY = 5;
    defaultPoint.forEach((item) => {
      createPoint(containerRef.current, initX + "%", initY + "%", "#3276F3");
      createPointInfo(
        containerRef.current,
        initX + "%",
        initY + "%",
        item.name
      );
      initY += 15;
    });
  }, []);

  const createFields = useCallback(() => {
    let initX = 30;
    let initY = 30;
    fields.forEach((item) => {
      createRect(
        containerRef.current,
        initX + "%",
        initY + "%",
        "rect-purple",
        item
      );
      // if (item.name.length > 4) {
      //   item.name = item.name.slice(0, 3) + "...";
      // }
      // createRectInfo(
      //   containerRef.current,
      //   initX + 2 + "%",
      //   initY + 2 + "%",
      //   item.name
      // );
      initX += 6;
    });
  }, []);

  const createCodeTables = useCallback((x: number, y: number) => {
    let initX = x;
    let initY = y;
    codeTables.forEach((item) => {
      createRect(
        containerRef.current,
        initX + "%",
        initY + "%",
        "rect-green",
        item
      );
      // createRectInfo(
      //   containerRef.current,
      //   initX + 2 + "%",
      //   initY + 2 + "%",
      //   item.name
      // );
      initX += 6;
    });
  }, []);

  const createTerms = useCallback(() => {
    let initX = 30;
    let initY = 5;
    terms.forEach((item) => {
      createRect(
        containerRef.current,
        initX + "%",
        initY + "%",
        "rect-blue",
        item
      );
      // createRectInfo(
      //   containerRef.current,
      //   initX + 2 + "%",
      //   initY + 2 + "%",
      //   item.name
      // );
      initX += 6;
    });
    createCodeTables(initX, initY);
  }, [createCodeTables]);

  const createModalProperties = useCallback((x: number, y: number) => {
    let initX = x;
    let initY = y;
    modelProperties.forEach((item) => {
      createRect(
        containerRef.current,
        initX + "%",
        initY + "%",
        "rect-green",
        item
      );
      // createRectInfo(
      //   containerRef.current,
      //   initX + 2 + "%",
      //   initY + 2 + "%",
      //   item.name
      // );
      initX += 6;
    });
  }, []);

  const createDataFields = useCallback(() => {
    let initX = 30;
    let initY = 55;
    dataFields.forEach((item) => {
      createRect(
        containerRef.current,
        initX + "%",
        initY + "%",
        "rect-blue",
        item
      );
      // createRectInfo(
      //   containerRef.current,
      //   initX + 2 + "%",
      //   initY + 2 + "%",
      //   item.name
      // );
      initX += 6;
    });
    createModalProperties(initX, initY);
  }, [createModalProperties]);

  const createModel = useCallback((x: number, y: number) => {
    let initX = x;
    let initY = y;
    models.forEach((item) => {
      createPoint(containerRef.current, initX + "%", initY + "%", "#3276F3");
      createPointInfo(
        containerRef.current,
        initX + "%",
        initY + "%",
        item.name
      );
      initX += 6;
    });
  }, []);

  const createData = useCallback(() => {
    let initX = 32;
    let initY = 85;
    data.forEach((item) => {
      createPoint(containerRef.current, initX + "%", initY + "%", "#3276F3");
      createPointInfo(
        containerRef.current,
        initX + "%",
        initY + "%",
        item.name
      );
      initX += 6;
    });
    createModel(initX, initY);
  }, [createModel]);

  useEffect(() => {
    if (canvasRef.current) {
      containerRef.current = createCanvas(canvasRef.current, canvasDragEvent);
    }
  }, [canvasDragEvent]);

  useEffect(() => {
    createPoint(containerRef.current, "20%", "50%", "#ED7D0C");
    createPointInfo(containerRef.current, "20%", "50%", centerPoint.name);
    createDefaultPoints();
    createFields();
    createTerms();
    createDataFields();
    createData();
  }, [
    createDataFields,
    createDefaultPoints,
    createFields,
    createData,
    createTerms,
  ]);

  useEffect(() => {
    drawLine(
      containerRef.current,
      { x: 0.2 * containerWidth, y: 0.5 * containerHeight, pointId: "0" },
      [{ x: 0, y: 0, pointId: "1" }]
    );
  }, [containerHeight, containerWidth]);
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
