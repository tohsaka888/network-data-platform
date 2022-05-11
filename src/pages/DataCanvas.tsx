import { Layout, Tag } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import SelectArea from "../components/SelectArea";
import { createCanvas } from "../d3_components/canvas";
import { D3CANVAS } from "../d3_components/type";
import { CanvasArea, MainCanvas, TypeArea } from "./DataCancas.style";

function DataCanvas() {
  const { Content } = Layout;
  const canvasRef = useRef<HTMLDivElement>();
  const containerRef = useRef<D3CANVAS>();
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
  useEffect(() => {
    if (canvasRef.current) {
      containerRef.current = createCanvas(canvasRef.current, canvasDragEvent);
    }
  }, [canvasDragEvent]);
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
