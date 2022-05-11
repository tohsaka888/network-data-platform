import { Layout } from "antd";
import React from "react";
import "./App.css";
import DataCanvas from "./pages/DataCanvas";

function App() {
  const { Header, Sider } = Layout;
  const contentHeight = window.innerHeight - 64;

  return (
    <div className="App">
      <Layout>
        <Header className="layout-header"></Header>
        <Layout>
          <Sider theme="light" className="layout-sider" />
          <Layout style={{ height: contentHeight }}>
            <Header style={{ background: "white" }} />
            <DataCanvas />
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
