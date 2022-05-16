import { Layout } from "antd";
// import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./mock/getData";
import { DATA } from "./type";
import DataCanvas from "./pages/DataCanvas";

function App() {
  const { Header, Sider } = Layout;
  const contentHeight = window.innerHeight - 64;
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
  const [data, setData] = useState<DATA>({
    model: [],
    centerPoint: [],
    defaultPoint: [],
    datameta: [],
    codeInfo: [],
    terminology: [],
    property: [],
    assetField: [],
    edges: [],
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="App">
      <Layout>
        <Header className="layout-header"></Header>
        <Layout>
          <Sider theme="light" className="layout-sider" />
          <Layout style={{ height: contentHeight }}>
            <Header style={{ background: "white" }} />
            {data.edges.length !== 0 && (
              <DataCanvas
                screenHeight={screenHeight}
                screenWidth={screenWidth}
                {...data}
              />
            )}
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
