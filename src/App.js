import { Layout } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadAllRecords } from "./redux/record/action";
import { loadAllUsers } from "./redux/user/action";
import DataTable from "./containers/DataTable";
import Panel from "./containers/Panel";

const { Header, Content, Footer, Sider } = Layout;
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllRecords());
    dispatch(loadAllUsers());
  }, [dispatch]);

  return (
    <>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Panel></Panel>
        </Header>
        <Layout>
          {/* <Sider>32</Sider> */}
          <Content style={{ margin: 16, borderRadius: 4 }}>
            <DataTable></DataTable>
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </>
  );
};
export default App;
