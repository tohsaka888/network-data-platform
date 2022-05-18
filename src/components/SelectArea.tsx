import { AreaChartOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";
import { SelectAreaContainer } from "../pages/DataCancas.style";

const items: MenuProps["items"] = [
  {
    label: "血缘",
    key: "graph",
    icon: <AreaChartOutlined />,
  },
];

function SelectArea() {
  return (
    <SelectAreaContainer>
      <Menu
        items={items}
        defaultSelectedKeys={["graph"]}
        mode="horizontal"
        style={{ background: "transparent" }}
      />
    </SelectAreaContainer>
  );
}

export default SelectArea;
