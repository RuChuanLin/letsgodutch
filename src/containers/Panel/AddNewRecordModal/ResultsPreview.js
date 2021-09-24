import { Table, Typography, Tooltip } from "antd";
import { CrownTwoTone } from "@ant-design/icons";

import { filterParticipants, fixNumber } from "../../../utils/common";
import colors from "../../../utils/colors";

const arrangeValues = (values) => {
  const {
    delivery: { fee: deliveryFee = 0 },
    discount: { amount: discountAmount = 0 },
    participants = {},
    payer = "",
  } = values;
  const filteredParticipants = filterParticipants(participants);
  const totalAmount = filteredParticipants.reduce((acc, [_, { cost }]) => acc + cost, 0);
  const participantCount = filteredParticipants.length;
  const totalSharedFee = deliveryFee - discountAmount;
  const sharedFee = fixNumber(totalSharedFee / participantCount);
  const columns = [
    {
      title: "訂餐人",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Tooltip title={payer === text ? "付款人" : null}>
          <Typography.Text strong>
            {payer === text && <CrownTwoTone twoToneColor={colors.mark} />}
            {text}
          </Typography.Text>
        </Tooltip>
      ),
    },

    {
      title: "金額",
      dataIndex: "cost",
      key: "cost",
      render: (cost) => (
        <Tooltip title={`${cost} ${sharedFee >= 0 ? "+" : "-"} ${Math.abs(sharedFee)}`}>
          <Typography.Link target="_blank">{fixNumber(cost + sharedFee)}</Typography.Link>
        </Tooltip>
      ),
    },
  ];
  const dataSource = filteredParticipants.map(([name, { cost }]) => ({
    key: name,
    name,
    cost,
  }));
  return {
    discountAmount,
    totalAmount,
    deliveryFee,
    totalSharedFee,
    participantCount,
    sharedFee,
    dataSource,
    columns,
  };
};

const ResultsPreview = ({ formik }) => {
  const { values } = formik;
  const {
    discountAmount,
    deliveryFee,
    totalAmount,
    totalSharedFee,
    participantCount,
    sharedFee,
    dataSource,
    columns,
  } = arrangeValues(values);
  return (
    <>
      <Typography.Title level={5}>
        {sharedFee < 0 ? "共享優惠" : "共同分擔"}：
        <Tooltip title={`運費：${deliveryFee}，優惠：${discountAmount}`}>
          <Typography.Link target="_blank">{Math.abs(totalSharedFee)}</Typography.Link>
        </Tooltip>{" "}
        ÷ {participantCount} = {Math.abs(sharedFee)}
      </Typography.Title>
      <Table
        scroll={{ y: 300 }}
        size="small"
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>總額</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{totalAmount}</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      ></Table>
    </>
  );
};

ResultsPreview.validate = (formik) => {
  return true;
};

ResultsPreview.title = "結果預覽";

export default ResultsPreview;
