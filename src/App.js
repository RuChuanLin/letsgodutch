import { Layout } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { loadAllRecords } from "./redux/record/action";
import { loadAllUsers } from "./redux/user/action";
import DataTable from "./containers/DataTable";
import Panel from "./containers/Panel";
import Sidebar from "./containers/Sidebar";
import UnderConstructionPage from "./containers/UnderConstructionPage";
import NotMatchedPage from "./containers/NotMatchedPage";

const { Header, Content, Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllRecords());
    dispatch(loadAllUsers());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Header style={{ padding: 0 }}>
          <Panel></Panel>
        </Header>
        <Layout>
          <Sidebar></Sidebar>
          <Layout>
            <Content style={{ margin: 16, borderRadius: 4 }}>
              <Switch>
                <Route exact path="/">
                  <DataTable></DataTable>
                </Route>
                <Route path="/transfer-money">
                  <UnderConstructionPage></UnderConstructionPage>
                </Route>
                <Route path="/manage-user">
                  <UnderConstructionPage></UnderConstructionPage>
                </Route>
                <Route path="/settings">
                  <UnderConstructionPage></UnderConstructionPage>
                </Route>

                <Route path="*">
                  <NotMatchedPage />
                </Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Let's go dutched! ©2021 Created by River
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};
export default App;
