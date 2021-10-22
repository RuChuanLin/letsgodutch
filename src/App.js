import { Layout } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadAllRecords } from "./redux/record/action";
import { loadAllUsers } from "./redux/user/action";
import DataTable from "./containers/DataTable";
import Panel from "./containers/Panel";
import Sidebar from "./containers/Sidebar";

const { Header, Content, Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllRecords());
    dispatch(loadAllUsers());
  }, [dispatch]);

  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <Panel></Panel>
      </Header>
      <Layout>
        <Sidebar></Sidebar>
        <Layout>
          <Content style={{ margin: 16, borderRadius: 4 }}>
            <DataTable></DataTable>
          </Content>
          <Footer style={{ textAlign: "center" }}>Let's go dutched! ©2021 Created by River</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
