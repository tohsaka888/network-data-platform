import { Layout } from "antd";
// import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import "./App.css";
import DataCanvas from "./pages/DataCanvas";

function App() {
  const { Header, Sider } = Layout;
  const contentHeight = window.innerHeight - 64;
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  });

  return (
    <div className="App">
      <Layout>
        <Header className="layout-header"></Header>
        <Layout>
          <Sider theme="light" className="layout-sider" />
          <Layout style={{ height: contentHeight }}>
            <Header style={{ background: "white" }} />
            <DataCanvas screenHeight={screenHeight} screenWidth={screenWidth} />
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
