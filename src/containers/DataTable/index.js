import { useSelector, useDispatch } from "react-redux";
import { Table, Spin } from "antd";

import generateColumns from "./functions/generateColumns";
import genDefaultRecord from "./functions/genDefaultRecord";
import genTranferMoneyRecord from "./functions/genTranferMoneyRecord";

const generateDataSource = (records, dispatch) => {
  return records.map((record, i) => {
    const { type } = record;
    switch (type) {
      // case "TRANSFER_MONEY":
      //   return genTranferMoneyRecord(record, i, dispatch);
      default:
        return genDefaultRecord(record, i, dispatch);
    }
  });
};

const DataTable = () => {
  const dispatch = useDispatch();
  const { data: records, loading } = useSelector((state) => state.records);
  const columns = generateColumns(records);
  const dataSource = generateDataSource(records, dispatch);
  return (
    <Spin spinning={loading}>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 1000 }}
        pagination={{ pageSize: 4 }}
      ></Table>
    </Spin>
  );
};
export default DataTable;
