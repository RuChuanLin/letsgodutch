import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Menu, Layout } from "antd";
import {
  PieChartOutlined,
  TransactionOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

const urls = [
  {
    url: "/",
    name: "帳務計算",
    icon: <PieChartOutlined />,
  },
  {
    url: "/transfer-money",
    name: "轉錢",
    icon: <TransactionOutlined />,
  },
  {
    url: "/manage-user",
    name: "管理使用者",
    icon: <UserOutlined />,
  },
  {
    url: "/settings",
    name: "設定",
    icon: <SettingOutlined />,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const history = useHistory();
  const location = useLocation();

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <div className="logo" />
      <Menu theme="light" defaultSelectedKeys={location.pathname} mode="inline">
        {urls.map(({ url, name, icon }) => (
          <Menu.Item key={url} icon={icon} onClick={() => history.push(url)}>
            {name}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
