import { Layout, Tag } from "antd";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
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
import { D3CANVAS, Point } from "../d3_components/type";
import {
  centerPoint,
  codeTables,
  data,
  fields,
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

  const startPoint = useMemo(
    () => ({
      x: 0.2 * containerWidth,
      y: 0.3 * containerHeight + 50,
      pointId: "0",
    }),
    [containerHeight, containerWidth]
  );

  const createDefaultPoints = useCallback(() => {
    let initX = 5;
    let initY = 5;
    centerPoint.property?.forEach((item) => {
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
      initX += (24 * 100) / containerWidth;
    });
  }, [containerHeight, containerWidth]);

  const createCodeTables = useCallback(
    (x: number, y: number) => {
      let initX = x + 24 * 100 / containerWidth;
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
        initX += (24 * 100) / containerWidth;
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
      initX += (24 * 100) / containerWidth;
    });
    createCodeTables(initX, initY);
  }, [containerHeight, containerWidth, createCodeTables]);

  const createDataProperties = useCallback(
    (dataProperties: Point[], x: number, y: number) => {
      let initX = x + (24 * 100) / containerWidth;
      let initY = y;
      dataProperties.forEach((item) => {
        createRect(
          containerRef.current,
          (initX / 100) * containerWidth,
          (initY / 100) * containerHeight,
          "rect-green",
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
      return initX;
    },
    [containerHeight, containerWidth]
  );

  const createModelFields = useCallback(
    (modelFields: Point[], initX = 30) => {
      let initY = 55;
      modelFields.forEach((item) => {
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
    [containerHeight, containerWidth]
  );

  // 创建Data
  const createData = useCallback(
    (x: number, y: number, propertyX: number) => {
      let initX = x + (24 * 100) / containerWidth;
      let initY = y;
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
        item.x = (initX / 100) * containerWidth;
        item.y = (initY / 100) * containerHeight;
        propertyX = createDataProperties(item.property || [], propertyX, 55);
        drawHorizontalLine(containerRef.current, item.property || []);
        initX = propertyX + (48 * 100) / containerWidth;
        drawLine(containerRef.current, item, item.property || []);
      });
    },
    [containerHeight, containerWidth, createDataProperties]
  );
  // 创建model
  const createModel = useCallback(() => {
    let propertyX = 30;
    let initX = propertyX + (24 * 100) / containerWidth;
    let initY = 85;
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
      item.x = (initX / 100) * containerWidth;
      item.y = (initY / 100) * containerHeight;
      let dataFields = item.property || [];
      propertyX = createModelFields(dataFields, propertyX);
      // drawRectLine(containerRef.current, startPoint, dataFields[0]);
      drawHorizontalLine(containerRef.current, dataFields);
      initX = propertyX + (24 * 100) / containerWidth;
      drawLine(containerRef.current, item, item.property || []);
    });
    return { initX, initY, propertyX };
    // createData(initX, initY);
    // createDataProperties(propertyX, 55);
  }, [containerHeight, containerWidth, createModelFields]);

  useEffect(() => {
    if (canvasRef.current) {
      containerRef.current = createCanvas(canvasRef.current, canvasDragEvent);
    }
  }, [canvasDragEvent]);

  useEffect(() => {
    createPoint(containerRef.current, startPoint.x, startPoint.y, "#ED7D0C");
    createPointInfo(
      containerRef.current,
      startPoint.x,
      startPoint.y,
      centerPoint.name
    );
    createDefaultPoints();
    createFields();
    createTerms();
    let pos = createModel();
    createData(pos.initX, pos.initY, pos.propertyX);
  }, [
    createDefaultPoints,
    createFields,
    createData,
    createTerms,
    containerWidth,
    containerHeight,
    startPoint.x,
    startPoint.y,
    createModel,
  ]);

  useEffect(() => {
    if (centerPoint.property) {
      drawLine(containerRef.current, startPoint, centerPoint.property);
    }
    drawRectLine(containerRef.current, startPoint, terms[0]);
    drawRectLine(containerRef.current, startPoint, fields[0]);
    drawHorizontalLine(containerRef.current, terms);
    drawHorizontalLine(containerRef.current, fields);
    drawHorizontalLine(containerRef.current, codeTables);
  }, [containerHeight, containerWidth, startPoint]);
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
