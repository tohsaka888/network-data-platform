import { Layout, Tag } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import SelectArea from "../components/SelectArea";
import { createCanvas } from "../d3_components/canvas";
import {
  drawHorizontalLine,
  drawLine,
  drawRectLine,
} from "../d3_components/line";
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
      createPoint(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "#3276F3"
      );
      createPointInfo(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        item.name
      );
      item.x = (initX / 100) * containerWidth;
      item.y = (initY / 100) * containerHeight;
      initY += 15;
    });
  }, [containerHeight, containerWidth]);

  const createFields = useCallback(() => {
    let initX = 30;
    let initY = 30;
    fields.forEach((item) => {
      createRect(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "rect-purple",
        item
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
      initX += 6;
    });
  }, [containerHeight, containerWidth]);

  const createCodeTables = useCallback(
    (x: number, y: number) => {
      let initX = x;
      let initY = y;
      codeTables.forEach((item) => {
        createRect(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          "rect-green",
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
        initX += 6;
      });
    },
    [containerHeight, containerWidth]
  );

  const createTerms = useCallback(() => {
    let initX = 30;
    let initY = 5;
    terms.forEach((item) => {
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
      initX += 6;
    });
    createCodeTables(initX, initY);
  }, [containerHeight, containerWidth, createCodeTables]);

  const createModalProperties = useCallback(
    (x: number, y: number) => {
      let initX = x;
      let initY = y;
      modelProperties.forEach((item) => {
        createRect(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          "rect-green",
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
        initX += 6;
      });
    },
    [containerHeight, containerWidth]
  );

  const createDataFields = useCallback(() => {
    let initX = 30;
    let initY = 55;
    dataFields.forEach((item) => {
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
      initX += 6;
    });
    createModalProperties(initX, initY);
  }, [containerHeight, containerWidth, createModalProperties]);

  const createModel = useCallback(
    (x: number, y: number) => {
      let initX = x;
      let initY = y;
      models.forEach((item) => {
        createPoint(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          "#3276F3"
        );
        createPointInfo(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          item.name
        );
        initX += 6;
      });
    },
    [containerHeight, containerWidth]
  );

  const createData = useCallback(() => {
    let initX = 32;
    let initY = 85;
    data.forEach((item) => {
      createPoint(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        "#3276F3"
      );
      createPointInfo(
        containerRef.current,
        (initX / 100) * containerWidth,
        (initY / 100) * containerHeight,
        item.name
      );
      initX += 6;
    });
    createModel(initX, initY);
  }, [containerHeight, containerWidth, createModel]);

  useEffect(() => {
    if (canvasRef.current) {
      containerRef.current = createCanvas(canvasRef.current, canvasDragEvent);
    }
  }, [canvasDragEvent]);

  useEffect(() => {
    createPoint(
      containerRef.current,
      0.2 * containerWidth,
      0.5 * containerHeight,
      "#ED7D0C"
    );
    createPointInfo(
      containerRef.current,
      0.2 * containerWidth,
      0.5 * containerHeight,
      centerPoint.name
    );
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
    containerWidth,
    containerHeight,
  ]);

  useEffect(() => {
    const startPoint = {
      x: 0.2 * containerWidth,
      y: 0.5 * containerHeight,
      pointId: "0",
    };
    drawLine(containerRef.current, startPoint, defaultPoint);
    drawRectLine(containerRef.current, startPoint, terms[0]);
    drawRectLine(containerRef.current, startPoint, dataFields[0]);
    drawRectLine(containerRef.current, startPoint, fields[0]);
    drawHorizontalLine(containerRef.current, terms);
    drawHorizontalLine(containerRef.current, dataFields);
    drawHorizontalLine(containerRef.current, fields);
    drawHorizontalLine(containerRef.current, codeTables);
    drawHorizontalLine(containerRef.current, modelProperties);
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
