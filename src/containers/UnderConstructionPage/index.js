import { Result, Button } from "antd";
import { Link } from "react-router-dom";

import { SmileOutlined } from "@ant-design/icons";

const UnderConstructionPage = () => (
  <Result
    icon={<SmileOutlined />}
    title="This page is under construction, please be patient!"
    extra={
      <Button type="primary">
        <Link to="/">Back Home</Link>
      </Button>
    }
  />
);

export default UnderConstructionPage;
